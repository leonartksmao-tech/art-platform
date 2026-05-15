"use client";

import { useState, useRef, useCallback } from "react";
import { AuthGuard } from "@/components/auth-guard";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/section-wrapper";
import { Upload, Sparkles, X, Loader2, ImagePlus, ArrowRightLeft } from "lucide-react";

const PROXY_URL = process.env.NEXT_PUBLIC_COMFYUI_PROXY_URL || "";
const PROXY_TOKEN = process.env.NEXT_PUBLIC_COMFYUI_TOKEN || "";

interface GeneratedImage {
  filename: string;
  url: string;
}

export default function CreatePage() {
  return (
    <AuthGuard>
      <CreatePageInner />
    </AuthGuard>
  );
}

function CreatePageInner() {
  const [modelImg, setModelImg] = useState<{ file: File; preview: string } | null>(null);
  const [clothingImg, setClothingImg] = useState<{ file: File; preview: string } | null>(null);
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [results, setResults] = useState<GeneratedImage[]>([]);
  const [error, setError] = useState("");

  const modelInputRef = useRef<HTMLInputElement>(null);
  const clothingInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File, setter: typeof setModelImg) => {
      if (!file.type.startsWith("image/")) return;
      setter({ file, preview: URL.createObjectURL(file) });
      setError("");
    },
    []
  );

  const fileToBase64 = async (file: File): Promise<string> => {
    const buf = await file.arrayBuffer();
    const b64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
    return `data:${file.type};base64,${b64}`;
  };

  const handleGenerate = async () => {
    if (!modelImg) { setError("请上传模特图"); return; }
    if (!clothingImg) { setError("请上传服装图"); return; }
    if (!prompt.trim()) { setError("请输入换装描述"); return; }

    setGenerating(true);
    setError("");
    setResults([]);
    setStatusText("正在上传图片...");

    try {
      const [modelBase64, clothingBase64] = await Promise.all([
        fileToBase64(modelImg.file),
        fileToBase64(clothingImg.file),
      ]);

      setStatusText("AI 正在换装中，预计 60-180 秒...");

      const res = await fetch(`${PROXY_URL}/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${PROXY_TOKEN}`,
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          modelImage: modelBase64,
          clothingImage: clothingBase64,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `请求失败 (${res.status})`);

      if (data.status === "done" && data.images?.length) {
        setResults(data.images);
        setStatusText("生成完成！");
      } else if (data.status === "pending") {
        setStatusText("生成超时，请稍后刷新页面查看结果");
      } else {
        throw new Error("未知响应状态");
      }
    } catch (e: any) {
      setError(e.message || "生成失败，请重试");
      setStatusText("");
    } finally {
      setGenerating(false);
    }
  };

  const ImageDropZone = ({
    label,
    desc,
    value,
    setter,
    inputRef,
  }: {
    label: string;
    desc: string;
    value: typeof modelImg;
    setter: typeof setModelImg;
    inputRef: React.RefObject<HTMLInputElement | null>;
  }) => (
    <div className="flex-1">
      <div
        onClick={() => inputRef.current?.click()}
        className={`relative rounded-2xl border-2 border-dashed p-6 text-center transition-all cursor-pointer min-h-[200px] flex flex-col items-center justify-center ${
          value
            ? "border-primary/50 bg-primary/5"
            : "border-muted-foreground/25 hover:border-muted-foreground/50"
        }`}
      >
        {value ? (
          <>
            <img
              src={value.preview}
              alt={label}
              className="max-h-44 rounded-xl shadow-md object-contain"
            />
            <button
              onClick={(e) => { e.stopPropagation(); setter(null); }}
              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-destructive text-white flex items-center justify-center shadow-md hover:bg-destructive/90"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <p className="text-xs text-muted-foreground mt-2">{label}</p>
          </>
        ) : (
          <>
            <ImagePlus className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm font-medium">{label}</p>
            <p className="text-xs text-muted-foreground mt-1">{desc}</p>
          </>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f, setter); }}
        className="hidden"
      />
    </div>
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="text-5xl mb-4">👗✨</div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
          <span className="sketch-title-underline">AI 电商换装</span>
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          上传模特图和服装图，AI 自动把服装换到模特身上 — 基于 Flux2 + 5090D 本地推理
        </p>
      </div>

      {/* Step 1: Upload Images */}
      <div className="mb-8">
        <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-primary text-white text-sm flex items-center justify-center">1</span>
          上传图片
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <ImageDropZone
            label="模特图"
            desc="需要换装的人物照片"
            value={modelImg}
            setter={setModelImg}
            inputRef={modelInputRef}
          />
          <div className="flex items-center justify-center">
            <ArrowRightLeft className="w-6 h-6 text-muted-foreground rotate-90 sm:rotate-0" />
          </div>
          <ImageDropZone
            label="服装图"
            desc="要换上的服装图片"
            value={clothingImg}
            setter={setClothingImg}
            inputRef={clothingInputRef}
          />
        </div>
      </div>

      {/* Step 2: Prompt */}
      <div className="mb-8">
        <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-primary text-white text-sm flex items-center justify-center">2</span>
          换装描述
        </h2>
        <textarea
          value={prompt}
          onChange={(e) => { setPrompt(e.target.value); setError(""); }}
          placeholder="例如：把服装图的图案放到模特身上，保持模特姿态不变，修掉红框标记区域"
          rows={3}
          className="w-full rounded-2xl border-2 border-border bg-card px-4 py-3 text-sm resize-none focus:outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground/60"
        />
      </div>

      {/* Generate Button */}
      <div className="text-center mb-10">
        <Button
          size="lg"
          onClick={handleGenerate}
          disabled={generating}
          className="gap-2 px-10 py-6 text-base"
        >
          {generating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              {statusText}
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              开始换装
            </>
          )}
        </Button>
        {statusText && !generating && (
          <p className="mt-3 text-sm text-green-600 font-medium">{statusText}</p>
        )}
        {error && (
          <p className="mt-3 text-sm text-destructive">{error}</p>
        )}
      </div>

      {/* Results */}
      {results.length > 0 && (
        <Section title="换装结果" subtitle="点击图片可放大查看">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {results.map((img, i) => (
              <a key={i} href={img.url} target="_blank" rel="noopener noreferrer" className="group">
                <div className="rounded-2xl overflow-hidden bg-card shadow-[0_8px_30px_rgba(0,0,0,0.06)] group-hover:shadow-[0_8px_40px_rgba(0,0,0,0.14)] group-hover:-translate-y-0.5 transition-all">
                  <div className="aspect-[4/3] relative bg-muted">
                    <img
                      src={img.url}
                      alt={`换装结果 ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 text-center">
                    <p className="text-xs text-muted-foreground truncate">{img.filename}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </Section>
      )}

      {/* How it works */}
      <div className="mt-16 pt-10 border-t border-border">
        <h2 className="text-lg font-bold text-center mb-6">换装流程</h2>
        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { icon: "📸", title: "上传两张图", desc: "模特照 + 服装照，支持 JPG/PNG" },
            { icon: "🤖", title: "AI 自动换装", desc: "Flux2 + RTX 5090D 本地推理，60-180 秒出图" },
            { icon: "💾", title: "保存作品", desc: "下载高清结果图，保存到作品库" },
          ].map((item) => (
            <div key={item.title} className="card-sketch bg-card p-5">
              <p className="text-3xl mb-3">{item.icon}</p>
              <h3 className="font-bold text-sm mb-2">{item.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
