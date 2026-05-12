import { notFound } from "next/navigation";
import Link from "next/link";
import { FALLBACK_COURSES } from "@/lib/data/fallback";

export const dynamic = "force-dynamic";

export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = FALLBACK_COURSES.find((c) => c.id === id);
  if (!course) notFound();

  const gradient = course.category === "CREATIVE"
    ? "from-purple-500 to-indigo-600"
    : "from-emerald-500 to-teal-600";

  return (
    <div>
      {/* Course header */}
      <div className={`bg-gradient-to-br ${gradient} text-white py-16`}>
        <div className="mx-auto max-w-3xl px-4">
          <span className="badge-pro bg-white/15 text-white/90 mb-3 inline-block">
            {course.category === "CREATIVE" ? "创作课" : "基础课"}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2">{course.title}</h1>
          <p className="mt-3 text-white/70 text-lg leading-relaxed max-w-2xl">{course.description}</p>
          <div className="mt-4 flex items-center gap-3 text-sm text-white/60">
            <span>{course.lessonCount} 节课</span>
            <span>·</span>
            <span>{course.category === "CREATIVE" ? "创造力训练" : "基础能力训练"}</span>
          </div>
        </div>
      </div>

      {/* Lesson list */}
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h2 className="text-xl font-bold mb-1">课程目录</h2>
        <p className="text-muted-foreground text-sm mb-6">{course.lessonCount} 节课，建议按顺序学习</p>

        <div className="space-y-1">
          {course.lessons.map((lesson, i) => (
            <Link key={lesson.id} href={`/courses/${course.id}/learn?lesson=${lesson.id}`}>
              <div className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-muted transition-colors cursor-pointer group border border-transparent hover:border-border">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-bold text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold group-hover:text-primary transition-colors">{lesson.title}</p>
                  <p className="text-sm text-muted-foreground">{lesson.coreThinking}</p>
                </div>
                <span className="text-muted-foreground text-sm shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  开始 →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href={`/courses/${course.id}/learn?lesson=${course.lessons[0]?.id}`}>
            <span className="btn-pro btn-pro-primary px-8 py-2.5 inline-block">
              从第一节开始学习
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
