export function Footer() {
  return (
    <footer className="bg-accent text-white/70 mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm">
        <p className="text-white font-semibold">猫猫老师 AI 创作教室</p>
        <p className="mt-1">央美审美 × AI 工作流 × 创造力训练</p>
        <p className="mt-1">让每个孩子都成为 AI 时代的创作者，而非消费者。</p>
        <p className="mt-4 text-xs text-white/40">
          &copy; {new Date().getFullYear()} 猫猫老师 AI 创作教室
        </p>
      </div>
    </footer>
  );
}
