// Cloudflare Worker: R2 视频代理 + 域名白名单 + 签名令牌

const ALLOWED_ORIGINS = [
  "maoart.online",
  "leonartksmao-tech.github.io",
];

async function generateValidTokens(secret, weekMs) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
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

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const key = url.pathname.replace(/^\//, "");
    const referer = request.headers.get("Referer") || "";
    const token = url.searchParams.get("t");

    const fromAllowedDomain = checkReferer(referer);
    const tokenValid = token ? await verifyToken(env.SIGN_SECRET, token) : false;

    if (!fromAllowedDomain && !tokenValid) {
      return new Response("Forbidden", { status: 403 });
    }

    const object = await env.VIDEOS.get(key);
    if (!object) {
      return new Response("Not Found", { status: 404 });
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set("Accept-Ranges", "bytes");
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Cache-Control", "public, max-age=86400");

    return new Response(object.body, { headers });
  },
};
