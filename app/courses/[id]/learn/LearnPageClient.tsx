"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FALLBACK_COURSES } from "@/lib/data/fallback";
import { getLessonIcon } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function LearnPageClient() {
  const searchParams = useSearchParams();
  const lessonId = searchParams.get("lesson");

  const allLessons = FALLBACK_COURSES.flatMap((c) =>
    c.lessons.map((l) => ({ ...l, courseId: c.id, courseTitle: c.title }))
  );
  const lesson = allLessons.find((l) => l.id === lessonId) as typeof allLessons[0] & { videoUrl?: string };

  if (!lesson) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">请选择一节课</h1>
        <p className="text-muted-foreground mb-6">从课程列表中选择一节课开始学习</p>
        <div className="flex gap-3 justify-center">
          {FALLBACK_COURSES.map((c) => (
            <Button key={c.id} asChild>
              <Link href={`/courses/${c.id}`}>{c.title}</Link>
            </Button>
          ))}
        </div>
      </div>
    );
  }

  const courseLessons = FALLBACK_COURSES.find((c) => c.id === lesson.courseId)?.lessons ?? [];
  const currentIndex = courseLessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? courseLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < courseLessons.length - 1 ? courseLessons[currentIndex + 1] : null;
  const progressPercent = ((currentIndex + 1) / courseLessons.length) * 100;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8">
        <p className="text-sm text-muted-foreground mb-1">{lesson.courseTitle}</p>
        <h1 className="text-2xl font-bold mb-2">第 {lesson.sortOrder} 节 · {lesson.title}</h1>
        <Badge variant="secondary">{lesson.coreThinking}</Badge>
      </div>

      <div className="flex items-center justify-between mb-8">
        {prevLesson ? (
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/courses/${lesson.courseId}/learn?lesson=${prevLesson.id}`}>
              <ChevronLeft className="h-4 w-4 mr-1" />{prevLesson.title}
            </Link>
          </Button>
        ) : <div />}
        <span className="text-sm text-muted-foreground">{currentIndex + 1} / {courseLessons.length}</span>
        {nextLesson ? (
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/courses/${lesson.courseId}/learn?lesson=${nextLesson.id}`}>
              {nextLesson.title}<ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        ) : <div />}
      </div>

      <div className="space-y-6">
        {"videoUrl" in lesson && (lesson as any).videoUrl && (
          <div className="rounded-xl overflow-hidden bg-black">
            <video
              src={`${process.env.NEXT_PUBLIC_VIDEO_BASE_URL ?? ""}${(lesson as any).videoUrl}`}
              controls
              className="w-full aspect-video"
              poster={"image" in lesson ? (lesson as any).image : undefined}
              preload="metadata"
              playsInline
            >
              您的浏览器不支持视频播放
            </video>
          </div>
        )}

        <div className="bg-muted rounded-xl p-8 text-center">
          <p className="text-5xl mb-4">{getLessonIcon(lesson.workflowType)}</p>
          <h2 className="text-xl font-bold mb-2">核心思维训练</h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">{lesson.coreThinking}</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-bold mb-3">课程内容即将上线</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              本节课的完整教学内容（三段式教学：灵感 → 共创 → 输出）正在从课程文档中导入。
              届时将包含：AI Prompt 模板、孩子操作步骤、教师指导要点。
            </p>
          </CardContent>
        </Card>

        <Progress value={progressPercent} className="h-2" />
        <p className="text-center text-xs text-muted-foreground">
          课程进度 {currentIndex + 1}/{courseLessons.length}
        </p>
      </div>

      <div className="mt-8 text-center">
        <Button variant="outline" asChild>
          <Link href={`/courses/${lesson.courseId}`}>返回课程目录</Link>
        </Button>
      </div>
    </div>
  );
}
