import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  coreThinking: string;
  sortOrder: number;
  courseId: string;
}

export function LessonRow({ lesson, index }: { lesson: Lesson; index: number }) {
  return (
    <Link
      href={`/courses/${lesson.courseId}/learn?lesson=${lesson.id}`}
      className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-muted transition-colors group border border-transparent hover:border-border"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-bold text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
        {index + 1}
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-semibold group-hover:text-primary transition-colors truncate">
          {lesson.title}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <Badge variant="outline" className="text-[10px] px-1.5 py-0 font-normal">
            {lesson.coreThinking}
          </Badge>
        </div>
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
    </Link>
  );
}
