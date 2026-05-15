// Cloudflare Worker: ComfyUI 代理 + 认证
// 前端 → Worker → Cloudflare Tunnel → 本机 ComfyUI (localhost:8001)

const ALLOWED_ORIGINS = [
  "maoart.online",
  "leonartksmao-tech.github.io",
  "localhost",
];

async function generateValidTokens(secret, weekMs) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw", encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  );
  const now = new Date();
  const tokens = [];
  for (let offset = -1; offset <= 1; offset++) {
    const week = Math.floor((now.getTime() + offset * weekMs) / weekMs);
    const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(String(week)));
    tokens.push(
      btoa(String.fromCharCode(...new Uint8Array(sig)))
        .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
    );
  }
  return tokens;
}

async function verifyToken(secret, token) {
  const weekMs = 7 * 24 * 60 * 60 * 1000;
  return (await generateValidTokens(secret, weekMs)).includes(token);
}

function checkReferer(referer) {
  if (!referer) return false;
  return ALLOWED_ORIGINS.some((d) => referer.includes(d));
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const token = url.searchParams.get("t") || request.headers.get("Authorization")?.replace("Bearer ", "");
    const referer = request.headers.get("Referer") || "";

    // CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders() });
    }

    // 认证：token 或 Referer 白名单
    const fromAllowedDomain = checkReferer(referer);
    const tokenValid = token ? await verifyToken(env.SIGN_SECRET, token) : false;
    if (!fromAllowedDomain && !tokenValid) {
      return new Response("Forbidden", { status: 403, headers: corsHeaders() });
    }

    // POST /generate — 一站式生图
    if (url.pathname === "/generate" && request.method === "POST") {
      try {
        return await handleGenerate(request, env, url);
      } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders() },
        });
      }
    }

    // GET /generated/* — 从 R2 读取生成图片
    if (url.pathname.startsWith("/generated/") && request.method === "GET") {
      const obj = await env.IMAGES.get(url.pathname.slice(1));
      if (!obj) return new Response("Not Found", { status: 404, headers: corsHeaders() });
      const headers = new Headers(corsHeaders());
      obj.writeHttpMetadata(headers);
      headers.set("Cache-Control", "public, max-age=86400");
      return new Response(obj.body, { headers });
    }

    // 透传其他请求到 ComfyUI
    const comfyuiUrl = env.COMFYUI_TUNNEL_URL;
    if (!comfyuiUrl) {
      return new Response(JSON.stringify({ error: "ComfyUI not configured" }), {
        status: 503,
        headers: { "Content-Type": "application/json", ...corsHeaders() },
      });
    }
    const target = new URL(url.pathname + url.search, comfyuiUrl);
    const proxyReq = new Request(target, {
      method: request.method,
      headers: request.headers,
      body: request.method !== "GET" ? await request.text() : undefined,
    });
    const res = await fetch(proxyReq);
    const resHeaders = new Headers(res.headers);
    Object.entries(corsHeaders()).forEach(([k, v]) => resHeaders.set(k, v));
    return new Response(res.body, { status: res.status, headers: resHeaders });
  },
};

// 将 base64 data URL 解码为 Uint8Array（逐字节处理，避免大文件调用栈溢出）
function dataUrlToBytes(dataUrl) {
  const match = dataUrl.match(/^data:(image\/\w+);base64,(.+)$/);
  if (!match) return null;
  const binary = atob(match[2]);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return { mimeType: match[1], bytes };
}

// 上传图片到 ComfyUI input 目录（通过 Tunnel）
async function uploadToComfyUI(comfyuiUrl, dataUrl, filename) {
  const decoded = dataUrlToBytes(dataUrl);
  if (!decoded) throw new Error("Invalid image data");

  const form = new FormData();
  form.append("image", new Blob([decoded.bytes], { type: decoded.mimeType }), filename);
  form.append("overwrite", "true");

  const res = await fetch(`${comfyuiUrl}/upload/image`, { method: "POST", body: form });
  if (!res.ok) throw new Error(`ComfyUI upload failed: ${res.status}`);
  return await res.json(); // { name, subfolder, type }
}

// 电商换装工作流（API 格式）
const HUANZHUANG_WORKFLOW = {
  "69": { "class_type": "ReferenceLatent", "inputs": { "conditioning": ["86", 0], "latent": ["87", 0] } },
  "70": { "class_type": "ReferenceLatent", "inputs": { "conditioning": ["116", 0], "latent": ["87", 0] } },
  "71": { "class_type": "ReferenceLatent", "inputs": { "conditioning": ["69", 0], "latent": ["72", 0] } },
  "72": { "class_type": "VAEEncode", "inputs": { "pixels": ["83", 0], "vae": ["102", 0] } },
  "73": { "class_type": "EmptyFlux2LatentImage", "inputs": { "width": ["82", 0], "height": ["82", 1], "batch_size": ["82", 2] } },
  "74": { "class_type": "KSamplerSelect", "inputs": { "sampler_name": "euler" } },
  "75": { "class_type": "RandomNoise", "inputs": { "noise_seed": 854239813634553 } },
  "76": { "class_type": "CFGGuider", "inputs": { "model": ["110", 0], "positive": ["101", 0], "negative": ["71", 0], "cfg": 1 } },
  "77": { "class_type": "SetNode", "inputs": { "IMAGE": ["115", 0] } },
  "78": { "class_type": "Flux2Scheduler", "inputs": { "steps": 8, "width": ["82", 0], "height": ["82", 1] } },
  "79": { "class_type": "SetNode", "inputs": { "IMAGE": ["114", 0] } },
  "80": { "class_type": "GetNode", "inputs": {} },
  "81": { "class_type": "Reroute", "inputs": { "": ["85", 0] } },
  "82": { "class_type": "GetImageSize", "inputs": { "image": ["100", 0] } },
  "83": { "class_type": "GetNode", "inputs": {} },
  "84": { "class_type": "SetNode", "inputs": { "IMAGE": ["85", 0] } },
  "85": { "class_type": "VAEDecode", "inputs": { "samples": ["111", 0], "vae": ["102", 0] } },
  "86": { "class_type": "CLIPTextEncode", "inputs": { "clip": ["108", 0], "text": "" } },
  "87": { "class_type": "VAEEncode", "inputs": { "pixels": ["100", 0], "vae": ["102", 0] } },
  "91": { "class_type": "CFGGuider", "inputs": { "model": ["110", 0], "positive": ["125", 0], "negative": ["125", 1], "cfg": 1 } },
  "92": { "class_type": "RandomNoise", "inputs": { "noise_seed": 610792111831294 } },
  "93": { "class_type": "Flux2Scheduler", "inputs": { "steps": 12, "width": ["97", 3], "height": ["97", 4] } },
  "94": { "class_type": "KSamplerSelect", "inputs": { "sampler_name": "euler" } },
  "95": { "class_type": "VAEDecode", "inputs": { "samples": ["113", 0], "vae": ["102", 0] } },
  "96": { "class_type": "GetNode", "inputs": {} },
  "97": { "class_type": "LayerUtility: ImageScaleByAspectRatio V2", "inputs": { "image": ["96", 0], "aspect_ratio": "original", "proportional_width": 1, "proportional_height": 1, "fit": "fill", "method": "lanczos", "round_to_multiple": "16", "scale_to_side": "longest", "scale_to_length": 2048, "background_color": "#000000" } },
  "98": { "class_type": "ImageScaleToTotalPixels", "inputs": { "image": ["99", 0], "upscale_method": "bicubic", "megapixels": 1.5, "resolution_steps": 1 } },
  "99": { "class_type": "GetNode", "inputs": {} },
  "100": { "class_type": "LayerUtility: ImageScaleByAspectRatio V2", "inputs": { "image": ["98", 0], "aspect_ratio": "original", "proportional_width": 1, "proportional_height": 1, "fit": "fill", "method": "lanczos", "round_to_multiple": "16", "scale_to_side": "None", "scale_to_length": 1024, "background_color": "#000000" } },
  "101": { "class_type": "ReferenceLatent", "inputs": { "conditioning": ["70", 0], "latent": ["72", 0] } },
  "102": { "class_type": "VAELoader", "inputs": { "vae_name": "flux2-vae.safetensors" } },
  "103": { "class_type": "GetNode", "inputs": {} },
  "104": { "class_type": "SaveImage", "inputs": { "images": ["85", 0], "filename_prefix": "Flux2-Klein-4b-base" } },
  "105": { "class_type": "Image Comparer (rgthree)", "inputs": { "image_a": ["80", 0], "image_b": ["81", 0] } },
  "107": { "class_type": "SaveImage", "inputs": { "images": ["120", 0], "filename_prefix": "Flux2-Klein-4b-base" } },
  "108": { "class_type": "CLIPLoader", "inputs": { "clip_name": "qwen_3_8b_fp8mixed.safetensors", "type": "flux2", "device": "default" } },
  "110": { "class_type": "UNETLoader", "inputs": { "unet_name": "flux-2-klein-9b.safetensors", "weight_dtype": "default" } },
  "111": { "class_type": "SamplerCustomAdvanced", "inputs": { "noise": ["75", 0], "guider": ["76", 0], "sampler": ["74", 0], "sigmas": ["78", 0], "latent_image": ["73", 0] } },
  "113": { "class_type": "SamplerCustomAdvanced", "inputs": { "noise": ["92", 0], "guider": ["91", 0], "sampler": ["94", 0], "sigmas": ["93", 0], "latent_image": ["125", 2] } },
  "114": { "class_type": "LoadImage", "inputs": { "image": "__CLOTHING__", "upload": "image" } },
  "115": { "class_type": "LoadImage", "inputs": { "image": "__MODEL__", "upload": "image" } },
  "116": { "class_type": "CLIPTextEncode", "inputs": { "clip": ["108", 0], "text": "__PROMPT__" } },
  "117": { "class_type": "Image Comparer (rgthree)", "inputs": { "image_a": ["103", 0], "image_b": ["120", 0] } },
  "119": { "class_type": "easy positive", "inputs": { "positive": "4K，修复画质，去除杂色和杂点" } },
  "120": { "class_type": "LayerColor: ColorAdapter", "inputs": { "image": ["128", 0], "color_ref_image": ["97", 0], "opacity": 75 } },
  "121": { "class_type": "SaveImage", "inputs": { "images": ["122", 0], "filename_prefix": "Flux2-Klein-4b-base" } },
  "122": { "class_type": "easy imageConcat", "inputs": { "image1": ["123", 0], "image2": ["120", 0], "direction": "right", "match_image_size": true } },
  "123": { "class_type": "easy imageConcat", "inputs": { "image1": ["115", 0], "image2": ["114", 0], "direction": "up", "match_image_size": true } },
  "125": { "class_type": "PainterFluxImageEdit", "inputs": { "clip": ["108", 0], "vae": ["102", 0], "image1": ["97", 0], "prompt": ["119", 0], "mode": "1_image", "batch_size": 1, "width": ["97", 3], "height": ["97", 4] } },
  "128": { "class_type": "Image Blending Mode", "inputs": { "image_a": ["95", 0], "image_b": ["97", 0], "mode": "color", "blend_percentage": 0.7 } },
};

async function handleGenerate(request, env, reqUrl) {
  const body = await request.json();
  const { prompt, modelImage, clothingImage } = body;
  const workerBase = `${reqUrl.protocol}//${reqUrl.host}`;

  if (!prompt) {
    return new Response(JSON.stringify({ error: "Missing prompt" }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders() },
    });
  }

  const comfyuiUrl = env.COMFYUI_TUNNEL_URL;
  if (!comfyuiUrl) {
    return new Response(JSON.stringify({ error: "ComfyUI not configured" }), {
      status: 503,
      headers: { "Content-Type": "application/json", ...corsHeaders() },
    });
  }

  // 1. 上传模特图和服装图到 ComfyUI input 目录
  const MAX_IMAGE = 10 * 1024 * 1024; // 10MB base64
  const uploads = [];
  if (modelImage) {
    if (modelImage.length > MAX_IMAGE * 1.4) throw new Error("模特图过大，请压缩后重试");
    uploads.push(uploadToComfyUI(comfyuiUrl, modelImage, `model_${Date.now()}.png`));
  }
  if (clothingImage) {
    if (clothingImage.length > MAX_IMAGE * 1.4) throw new Error("服装图过大，请压缩后重试");
    uploads.push(uploadToComfyUI(comfyuiUrl, clothingImage, `clothing_${Date.now()}.png`));
  }
  const results = await Promise.all(uploads);

  // 2. 深拷贝工作流
  const wf = JSON.parse(JSON.stringify(HUANZHUANG_WORKFLOW));

  // 2a. 绕过 SetNode/GetNode/Reroute（这些节点在 API 端不存在）
  // 图一=模特(115), 图二=服装(114), 图三=VAEDecode输出(85)
  const REWRITE = {
    "80": "115",  // GetNode 图一 → 模特
    "83": "114",  // GetNode 图二 → 服装
    "96": "85",   // GetNode 图三 → VAEDecode
    "99": "115",  // GetNode 图一 → 模特
    "103": "85",  // GetNode 图三 → VAEDecode
    "81": "85",   // Reroute → VAEDecode
  };
  const REMOVE = new Set(["77", "79", "84", "80", "81", "83", "96", "99", "103"]);

  // 重写所有节点输入中的引用
  for (const [nodeId, node] of Object.entries(wf)) {
    if (REMOVE.has(nodeId)) continue;
    for (const [key, val] of Object.entries(node.inputs)) {
      if (Array.isArray(val) && val.length >= 1 && REWRITE[val[0]]) {
        node.inputs[key] = [REWRITE[val[0]], val[1] ?? 0];
      }
    }
  }
  // 删除 SetNode/GetNode/Reroute
  for (const id of REMOVE) delete wf[id];

  // 2b. 注入用户上传的图片和提示词
  let modelIdx = 0;
  if (modelImage) {
    wf["115"].inputs.image = results[modelIdx++].name;
    delete wf["115"].inputs.upload;
  }
  if (clothingImage) {
    wf["114"].inputs.image = results[modelIdx].name;
    delete wf["114"].inputs.upload;
  }
  wf["116"].inputs.text = prompt;

  // 3. 提交到 ComfyUI
  const queueRes = await fetch(`${comfyuiUrl}/prompt`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: wf }),
  });
  if (!queueRes.ok) {
    const errText = await queueRes.text();
    throw new Error(`ComfyUI queue failed: ${queueRes.status} — ${errText}`);
  }
  const { prompt_id } = await queueRes.json();

  // 4. 轮询等待完成（最长 280 秒，每次 8 秒，共 35 次）
  const maxRetries = 35;
  for (let i = 0; i < maxRetries; i++) {
    await new Promise((r) => setTimeout(r, 8000));
    const histRes = await fetch(`${comfyuiUrl}/history/${prompt_id}`);
    if (!histRes.ok) continue;
    const hist = await histRes.json();
    const entry = hist[prompt_id];
    if (!entry) continue;

    if (entry.status?.completed) {
      // 5. 收集输出图片，存入 R2
      const images = [];
      for (const [nodeId, outputs] of Object.entries(entry.outputs)) {
        for (const output of outputs.images || []) {
          const imgRes = await fetch(`${comfyuiUrl}/view?filename=${output.filename}&subfolder=${output.subfolder || ""}`);
          if (!imgRes.ok) continue;
          const imgData = await imgRes.arrayBuffer();
          const key = `generated/${prompt_id}/${output.filename}`;
          if (env.IMAGES) {
            await env.IMAGES.put(key, imgData, {
              httpMetadata: { contentType: "image/png" },
            });
          }
          images.push({
            filename: output.filename,
            url: env.IMAGES ? `${workerBase}/${key}` : `${comfyuiUrl}/view?filename=${output.filename}`,
          });
        }
      }
      return new Response(JSON.stringify({ status: "done", prompt_id, images }), {
        headers: { "Content-Type": "application/json", ...corsHeaders() },
      });
    }
  }

  return new Response(JSON.stringify({ status: "pending", prompt_id, message: "Still generating, poll /status" }), {
    headers: { "Content-Type": "application/json", ...corsHeaders() },
  });
}
