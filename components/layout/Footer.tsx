export function Footer() {
  return (
    <footer className="bg-accent text-white/70 mt-auto">
      {/* 装饰性猫爪分隔 */}
      <div className="flex justify-center gap-4 pt-6 pb-0 text-white/20 text-xs tracking-widest">
        <span className="tilt-1">🐾</span>
        <span className="tilt-3 -mt-1">🎨</span>
        <span className="tilt-5">🐾</span>
        <span className="tilt-2 -mt-1">✏️</span>
        <span className="tilt-4">🐾</span>
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8 text-center text-sm">
        <p className="text-white font-semibold text-base">
          🐱 猫猫老师 AI 创作教室
        </p>
        <p className="mt-2 text-white/60">央美审美 × AI 工作流 × 创造力训练</p>
        <p className="mt-1 text-white/50">让每个孩子都成为 AI 时代的创作者，而非消费者。</p>
        <div className="mt-5 flex items-center justify-center gap-3 text-white/30 text-xs">
          <span>🎓 学院派 AI 美育</span>
          <span>·</span>
          <span>🐾 猫猫老师</span>
          <span>·</span>
          <span>✨ 创造力训练</span>
        </div>
        <p className="mt-4 text-xs text-white/25">
          &copy; {new Date().getFullYear()} 猫猫老师 AI 创作教室
        </p>
      </div>
    </footer>
  );
}
