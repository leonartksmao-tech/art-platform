import Link from "next/link";
import { FALLBACK_COURSES } from "@/lib/data/fallback";

export const dynamic = "force-dynamic";

export default function CoursesPage() {
  const courses = FALLBACK_COURSES;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-12">
        <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wider mb-2">课程目录</p>
        <h1 className="section-title text-4xl">探索全部课程</h1>
        <p className="mt-2 text-muted-foreground text-lg">21 节 AI 融合创作课，两大体系，系统进阶</p>
      </div>

      <div className="space-y-16">
        {courses.map((course) => (
          <div key={course.id}>
            <div className="flex items-end justify-between mb-6">
              <div>
                <span className="badge-pro bg-primary/10 text-primary mb-2">
                  {course.category === "CREATIVE" ? "创作课" : "基础课"}
                </span>
                <h2 className="text-2xl font-extrabold tracking-tight mt-2">{course.title}</h2>
                <p className="text-muted-foreground mt-1 max-w-xl">{course.description}</p>
              </div>
              <Link href={`/courses/${course.id}`}>
                <span className="text-primary font-semibold text-sm hover:underline whitespace-nowrap">查看全部 {course.lessonCount} 节 →</span>
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {course.lessons.map((lesson, i) => (
                <Link key={lesson.id} href={`/courses/${course.id}/learn?lesson=${lesson.id}`}>
                  <div className="card-pro p-4 h-full cursor-pointer">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-bold text-muted-foreground">
                        {i + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="font-semibold text-sm truncate">{lesson.title}</p>
                        <p className="text-xs text-muted-foreground truncate mt-0.5">{lesson.coreThinking}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
