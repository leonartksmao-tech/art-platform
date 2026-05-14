import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Play, Lock } from "lucide-react";
import { FALLBACK_COURSES } from "@/lib/data/fallback";

export default function MyCoursesPage() {
  const allLessons = FALLBACK_COURSES.flatMap((c) =>
    c.lessons.map((l) => ({ ...l, courseId: c.id, courseCategory: c.category }))
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">我的课程</h1>
      <div className="space-y-2">
        {allLessons.map((lesson, i) => {
          const isCompleted = i < 5;
          const isNext = i === 5;
          return (
            <Link key={lesson.id} href={`/courses/${lesson.courseId}/learn?lesson=${lesson.id}`}>
              <Card className="hover:shadow transition-shadow cursor-pointer">
                <CardContent className="flex items-center gap-4 py-4">
                  {isCompleted ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : isNext ? (
                    <Play className="h-5 w-5 text-primary" />
                  ) : (
                    <Lock className="h-5 w-5 text-muted-foreground/50" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium">{lesson.title}</p>
                    <p className="text-xs text-muted-foreground">{lesson.coreThinking}</p>
                  </div>
                  <Badge variant={isCompleted ? "default" : "outline"}>
                    {isCompleted ? "已完成" : isNext ? "进行中" : "未开始"}
                  </Badge>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
