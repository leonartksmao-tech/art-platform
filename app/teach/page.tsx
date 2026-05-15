import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/section-wrapper";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function TeachPage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-16 sm:py-24 bg-accent text-accent-foreground">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-5xl mb-4">🎓</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            成为 MaoArt 讲师
          </h1>
          <p className="text-lg text-white/70 max-w-lg mx-auto leading-relaxed">
            分享你的作品与教学方法，连接 AI 时代的小创作者。
          </p>
        </div>
      </section>

      {/* What you can do */}
      <Section title="你可以做什么" subtitle="多种方式参与，分享你的创作与教学">
        <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {[
            { icon: "🎨", title: "展示作品", desc: "发布你的 AI 艺术作品到作品库，让更多学员和家长看到。" },
            { icon: "📖", title: "发布课程", desc: "从你的教学经验出发，设计 AI 融合创作课程，分享给平台学员。" },
            { icon: "✍️", title: "撰写文章", desc: "分享 AI 美育理念、教学心得、创作流程，建立个人品牌。" },
            { icon: "👨‍👩‍👧", title: "连接家庭", desc: "直接与学员家长沟通，提供一对一的 AI 创作指导。" },
          ].map((item) => (
            <div key={item.title} className="card-sketch bg-card p-6">
              <p className="text-3xl mb-3">{item.icon}</p>
              <h3 className="font-bold text-base mb-1.5">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Who we're looking for */}
      <Section title="我们在找谁" subtitle="如果你符合以下任何一条，欢迎加入" variant="muted">
        <div className="max-w-2xl mx-auto space-y-3">
          {[
            "🎨 美术老师 / 美术教育从业者，对 AI 工具感兴趣",
            "📚 儿童绘本作者 / 插画师，想探索 AI 辅助创作",
            "🤖 AI 创作者 / Prompt 工程师，愿意分享工作流",
            "👨‍👩‍👧 有教育热情的创作者，愿意陪伴孩子成长",
          ].map((text) => (
            <div key={text} className="card-sketch bg-card p-4 text-sm leading-relaxed">
              {text}
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="py-14 sm:py-20 bg-background">
        <div className="mx-auto max-w-xl px-6 text-center">
          <p className="text-4xl mb-4">💬</p>
          <h2 className="text-2xl font-extrabold tracking-tight mb-3">加入社群</h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            扫码加入「央美猫猫老师绘本 AI 创作营」微信群，直接交流。
          </p>
          <div className="flex justify-center mb-6">
            <div className="card-sketch bg-card p-4 w-52 h-52 sm:w-60 sm:h-60 flex items-center justify-center">
              <img src="/qrcode-cropped.jpg" alt="微信群二维码" className="w-full h-full object-contain" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mb-6">
            群聊：央美猫猫老师绘本 AI 创作营
          </p>
          <p className="text-muted-foreground leading-relaxed">
            或发送邮件至 <span className="font-semibold text-foreground">maoart@maoart.online</span>
          </p>
        </div>
      </section>
    </div>
  );
}
