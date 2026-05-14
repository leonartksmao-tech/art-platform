import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  category: "CREATIVE" | "BASIC";
  lessonCount: number;
  lessons: { coreThinking: string; workflowType: string }[];
}

const courseConfig: Record<string, { gradient: string; emoji: string; label: string }> = {
  CREATIVE: {
    gradient: "from-purple-500 to-indigo-600",
    emoji: "🎨",
    label: "创作课",
  },
  BASIC: {
    gradient: "from-emerald-500 to-teal-600",
    emoji: "📐",
    label: "基础课",
  },
};

export function CourseCard({ course }: { course: Course }) {
  const config = courseConfig[course.category] ?? courseConfig.CREATIVE;

  return (
    <Link href={`/courses/${course.id}`} className="group block">
      <div className="rounded-xl border bg-card shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all overflow-hidden">
        <div
          className={`h-40 bg-gradient-to-br ${config.gradient} flex items-center justify-center relative`}
        >
          <span className="text-5xl">{config.emoji}</span>
          <Badge className="absolute top-3 left-3 bg-white/15 text-white border-0">
            {config.label}
          </Badge>
        </div>
        <div className="p-5 space-y-2">
          <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-muted-foreground">{course.lessonCount} 节课</span>
            <span className="text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
              查看课程 <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function CourseCardCompact({ course }: { course: Course }) {
  const config = courseConfig[course.category] ?? courseConfig.CREATIVE;

  return (
    <Link href={`/courses/${course.id}`} className="group flex gap-4 p-3 rounded-lg hover:bg-muted transition-colors">
      <div
        className={`h-16 w-16 shrink-0 rounded-lg bg-gradient-to-br ${config.gradient} flex items-center justify-center`}
      >
        <span className="text-2xl">{config.emoji}</span>
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="font-semibold text-sm group-hover:text-primary transition-colors truncate">
          {course.title}
        </h4>
        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{course.description}</p>
        <div className="flex items-center gap-2 mt-1">
          <Badge variant="outline" className="text-[10px] px-1.5 py-0">{config.label}</Badge>
          <span className="text-[11px] text-muted-foreground">{course.lessonCount} 节</span>
        </div>
      </div>
    </Link>
  );
}
