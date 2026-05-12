export default function CreatePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 text-center">
      <div className="text-6xl mb-6">🤖✨</div>
      <h1 className="text-2xl font-bold mb-4">
        <span className="sketch-title-underline">AI 生图功能即将上线</span>
      </h1>
      <div className="card-sketch p-8 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-3">Phase 2 开发中</h2>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          接入 Replicate + ComfyUI，上传孩子草图，一键生成 3 种风格变体
        </p>
        <p className="text-muted-foreground mb-4">⏳ 预计 2-3 周后上线</p>
        <div className="text-sm text-muted-foreground space-y-2 text-left">
          <p className="font-bold text-center mb-2">支持的功能：</p>
          <p>🎯 8 种工作流模板选择</p>
          <p>📤 上传孩子草图</p>
          <p>🎨 一键生成 3 种风格变体</p>
          <p>💾 保存到作品库</p>
        </div>
      </div>
    </div>
  );
}
