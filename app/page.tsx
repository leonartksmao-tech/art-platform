import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="hero-pro text-white py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="badge-pro bg-white/15 text-white/90 mb-4">央美审美 × AI 工作流 × 创造力训练</span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mt-3">
                让每个孩子成为
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                  AI 时代的创作者
                </span>
              </h1>
              <p className="mt-6 text-lg text-white/70 max-w-lg leading-relaxed">
                AI 可以模仿技术，但模仿不出孩子对世界的独特感知。
                21 节 AI 融合创作课，保护童真，放大想象。
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/courses">
                  <span className="btn-pro btn-pro-primary text-lg px-8 py-3 inline-block">开始学习</span>
                </Link>
                <Link href="/gallery">
                  <span className="btn-pro btn-pro-outline border-white/20 text-white hover:border-white/50 inline-block text-lg px-8 py-3">
                    浏览作品
                  </span>
                </Link>
              </div>
              <div className="mt-6 flex items-center gap-4 text-sm text-white/50">
                <span>✓ 21 节精品课程</span>
                <span>✓ 5 级成长体系</span>
                <span>✓ 12 个成就徽章</span>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-amber-400/20 to-orange-400/10 border border-white/10 flex items-center justify-center">
                <span className="text-8xl">🎨</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 课程体系 */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">两大课程体系</h2>
            <p className="mt-2 text-muted-foreground text-lg">从基础能力到创造性思维，系统培养 AI 时代的小创作者</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link href="/courses/creative">
              <div className="card-pro p-0 h-full cursor-pointer">
                <div className="h-40 bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                  <span className="text-5xl">🎬</span>
                </div>
                <div className="p-6">
                  <span className="badge-pro bg-purple-100 text-purple-700 mb-2">12 节课</span>
                  <h3 className="text-xl font-bold mt-2">创作课</h3>
                  <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
                    拆解力、导演思维、色彩叙事、符号化表达——每节课训练一种核心思维，产出一个物理作品。
                  </p>
                  <p className="text-primary font-semibold text-sm mt-4">查看课程 →</p>
                </div>
              </div>
            </Link>
            <Link href="/courses/basic">
              <div className="card-pro p-0 h-full cursor-pointer">
                <div className="h-40 bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                  <span className="text-5xl">✏️</span>
                </div>
                <div className="p-6">
                  <span className="badge-pro bg-emerald-100 text-emerald-700 mb-2">9 节课</span>
                  <h3 className="text-xl font-bold mt-2">基础课</h3>
                  <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
                    图形概括、人体解构、空间逻辑、设计思维——建立从观察到创作的完整能力链。
                  </p>
                  <p className="text-primary font-semibold text-sm mt-4">查看课程 →</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 为什么不同 */}
      <section className="py-20 bg-muted">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">为什么选择 AI 创作课</h2>
            <p className="mt-2 text-muted-foreground text-lg">不只是学画画，更是培养 AI 时代的核心创造力</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: "🎬", title: "AI 是画笔，孩子是导演", desc: "孩子画草图定故事方向，AI 辅助润色。AI 不会讲故事，孩子会。" },
              { icon: "👨‍👩‍👧", title: "亲子共创时光", desc: "家长文字 + 孩子草图 + 老师导读 + AI 落地。创作成为高质量陪伴。" },
              { icon: "🃏", title: "21 卡牌 + 12 成就", desc: "拆解之力、导演之眼、色彩之心……完成即解锁，收集见证成长。" },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 text-center border border-border">
                <p className="text-4xl mb-3">{item.icon}</p>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 作品预览 */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="section-title">学员作品</h2>
              <p className="mt-1 text-muted-foreground">每个孩子与 AI 协作的独特创意结晶</p>
            </div>
            <Link href="/gallery">
              <span className="text-primary font-semibold text-sm hover:underline">查看全部 →</span>
            </Link>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              { img: "breakfast1", teacherId: "teacher-breakfast" },
              { img: "butterfly1", teacherId: "teacher-butterfly" },
              { img: "doll1", teacherId: "teacher-doll" },
              { img: "mask1", teacherId: "teacher-mask" },
              { img: "sticker1", teacherId: "teacher-sticker" },
              { img: "pattern1", teacherId: "teacher-pattern" },
            ].map(({ img, teacherId }) => (
              <Link key={teacherId} href={`/gallery/${teacherId}`}>
                <div className="card-pro cursor-pointer relative">
                  <img
                    src={`/works/${img}.jpg`}
                    alt=""
                    className="w-full aspect-square object-cover filter saturate-[0.85] contrast-[1.05] brightness-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-40" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center bg-accent text-accent-foreground">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="text-3xl font-extrabold tracking-tight mb-4">准备好开始了吗？</h2>
          <p className="text-white/70 mb-8 text-lg leading-relaxed">
            加入猫猫老师的 AI 创作教室，让孩子的手、脑、心与 AI 一起工作。
          </p>
          <Link href="/courses">
            <span className="btn-pro btn-pro-primary text-lg px-10 py-3.5 inline-block bg-white text-accent hover:bg-white/90">
              免费开始学习
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
