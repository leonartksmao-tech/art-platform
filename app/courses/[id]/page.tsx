import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LessonRow } from "@/components/lesson-row";
import { FALLBACK_COURSES } from "@/lib/data/fallback";
import { Play } from "lucide-react";

export function generateStaticParams() {
  return FALLBACK_COURSES.map((c) => ({ id: c.id }));
}

export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = FALLBACK_COURSES.find((c) => c.id === id);
  if (!course) notFound();

  return (
    <div>
      <div className="bg-muted py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Badge variant="secondary" className="mb-4">
            创意绘本课
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{course.title}</h1>
          <p className="mt-3 text-muted-foreground text-lg leading-relaxed max-w-2xl">{course.description}</p>
          <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
            <span>{course.lessonCount} 节课</span>
            <span>·</span>
            <span>AI 融合创作训练</span>
          </div>
          <div className="mt-6">
            <Button size="lg" className="bg-primary hover:bg-[#d04a40]" asChild>
              <Link href={`/courses/${course.id}/learn?lesson=${course.lessons[0]?.id}`} className="gap-2">
                <Play className="h-4 w-4" /> 从第一节开始学习
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-1">课程目录</h2>
            <p className="text-muted-foreground text-sm mb-6">{course.lessonCount} 节课，建议按顺序学习</p>
            <div className="space-y-1">
              {course.lessons.map((lesson, i) => (
                <LessonRow key={lesson.id} lesson={{ ...lesson, courseId: course.id }} index={i} />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">课程信息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">课程类型</span>
                  <span className="font-medium">创意绘本课</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">课时数</span>
                  <span className="font-medium">{course.lessonCount} 节</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">核心思维</span>
                  <span className="font-medium">8 种工作流</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">核心思维标签</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5">
                  {course.lessons.map((l) => (
                    <Badge key={l.id} variant="secondary" className="text-[11px]">
                      {l.coreThinking}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Button className="w-full" asChild>
              <Link href={`/courses/${course.id}/learn?lesson=${course.lessons[0]?.id}`}>
                开始学习
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
