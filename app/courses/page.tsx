import { CourseCard } from "@/components/course-card";
import { FALLBACK_COURSES } from "@/lib/data/fallback";

export default function CoursesPage() {
  return (
    <div>
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">课程大厅</h1>
          <p className="mt-3 text-muted-foreground text-lg">21 节 AI 融合创作课，从图形概括到综合创作</p>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-md mx-auto">
            {FALLBACK_COURSES.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
