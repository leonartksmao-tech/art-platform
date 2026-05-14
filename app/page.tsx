import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/section-wrapper";
import { CourseCard } from "@/components/course-card";
import { WorkCard } from "@/components/work-card";
import { LessonRow } from "@/components/lesson-row";
import { SkillCardMini } from "@/components/skill-card-mini";
import { FALLBACK_COURSES, FALLBACK_TEACHER_WORKS, FALLBACK_SKILL_CARDS } from "@/lib/data/fallback";

export default function HomePage() {
  const allLessons = FALLBACK_COURSES.flatMap((c) =>
    c.lessons.slice(0, 3).map((l) => ({ ...l, courseId: c.id }))
  ).slice(0, 6);

  const displaySkills = FALLBACK_SKILL_CARDS.slice(0, 8);

  return (
    <div>
      {/* Header */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <Badge variant="secondary" className="mb-5">
            央美审美 × AI 工作流 × 创造力训练
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-foreground">
            让每个孩子成为
            <span className="block text-primary">
              AI 时代的创作者
            </span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            AI 可以模仿技术，但模仿不出孩子对世界的独特感知。
            21 节 AI 融合创作课，保护童真，放大想象。
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Button size="lg" className="bg-primary hover:bg-[#d04a40]" asChild>
              <Link href="/courses">开始学习</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/gallery">浏览作品</Link>
            </Button>
          </div>
          <div className="mt-6 flex items-center gap-4 justify-center text-sm text-muted-foreground">
            <span>✓ 21 节精品课程</span>
            <span>✓ 5 级成长体系</span>
            <span>✓ 12 个成就徽章</span>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <Section title="两大课程体系" subtitle="从基础能力到创造性思维，系统培养 AI 时代的小创作者" viewAllHref="/courses">
        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {FALLBACK_COURSES.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </Section>

      {/* Lesson Quick Scroll */}
      <Section title="探索课程" subtitle="21 节课，从图形概括到综合创作" viewAllHref="/courses">
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory no-scrollbar">
          {FALLBACK_COURSES.flatMap((c) =>
            c.lessons.map((l) => ({ ...l, courseId: c.id, courseCategory: c.category, courseTitle: c.title }))
          ).slice(0, 10).map((lesson) => {
            const isCreative = lesson.courseCategory === "CREATIVE";
            return (
              <Link
                key={lesson.id}
                href={`/courses/${lesson.courseId}/learn?lesson=${lesson.id}`}
                className="w-[170px] shrink-0 snap-start"
              >
                <div className="rounded-2xl bg-card shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.14)] hover:-translate-y-0.5 transition-all overflow-hidden">
                  <div
                    className={`h-24 flex items-center justify-center ${
                      isCreative
                        ? "bg-gradient-to-br from-purple-500 to-indigo-600"
                        : "bg-gradient-to-br from-emerald-500 to-teal-600"
                    }`}
                  >
                    <span className="text-3xl">{isCreative ? "🎨" : "📐"}</span>
                  </div>
                  <div className="p-3">
                    <p className="font-semibold text-sm truncate">{lesson.title}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2 leading-snug">
                      {lesson.coreThinking}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* Value Props */}
      <Section title="为什么选择 AI 创作课" subtitle="不只是学画画，更是培养 AI 时代的核心创造力" variant="muted">
        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { icon: "🎬", title: "AI 是画笔，孩子是导演", desc: "孩子画草图定故事方向，AI 辅助润色。AI 不会讲故事，孩子会。" },
            { icon: "👨‍👩‍👧", title: "亲子共创时光", desc: "家长文字 + 孩子草图 + 老师导读 + AI 落地。创作成为高质量陪伴。" },
            { icon: "🃏", title: "21 卡牌 + 12 成就", desc: "拆解之力、导演之眼、色彩之心……完成即解锁，收集见证成长。" },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl bg-card shadow-[0_8px_40px_rgba(0,0,0,0.08)] p-6 text-center">
              <p className="text-4xl mb-3">{item.icon}</p>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Latest Lessons */}
      <Section title="最新课程" subtitle="从第一节课开始你的创作之旅" viewAllHref="/courses">
        <div className="space-y-1 max-w-3xl mx-auto">
          {allLessons.map((lesson, i) => (
            <LessonRow key={lesson.id} lesson={lesson} index={i} />
          ))}
        </div>
      </Section>

      {/* Student Works */}
      <Section title="学员作品" subtitle="每个孩子与 AI 协作的独特创意结晶" viewAllHref="/gallery" variant="muted">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {FALLBACK_TEACHER_WORKS.slice(0, 6).map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
      </Section>

      {/* Skill Cards */}
      <Section title="技能卡牌收集" subtitle="每节课解锁一张卡牌，21 张卡牌见证成长" viewAllHref="/profile/skills">
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory no-scrollbar">
          {displaySkills.map((skill) => (
            <div key={skill.name} className="w-[140px] shrink-0 snap-start">
              <SkillCardMini
                name={skill.name}
                rarity={skill.rarity}
                image={skill.image}
                description={skill.description}
              />
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section title="准备好开始了吗？" subtitle="加入猫猫老师的 AI 创作教室，让孩子的手、脑、心与 AI 一起工作。" variant="muted">
        <div className="text-center">
          <Button size="lg" className="bg-primary hover:bg-[#d04a40]" asChild>
            <Link href="/courses">免费开始学习</Link>
          </Button>
        </div>
      </Section>
    </div>
  );
}
