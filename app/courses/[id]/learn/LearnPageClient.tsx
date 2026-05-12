"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FALLBACK_COURSES } from "@/lib/data/fallback";

export function LearnPageClient() {
  const searchParams = useSearchParams();
  const lessonId = searchParams.get("lesson");

  const allLessons = FALLBACK_COURSES.flatMap((c) =>
    c.lessons.map((l) => ({ ...l, courseId: c.id, courseTitle: c.title }))
  );
  const lesson = allLessons.find((l) => l.id === lessonId);

  if (!lesson) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">请选择一节课</h1>
        <p className="text-muted-foreground mb-6">从课程列表中选择一节课开始学习</p>
        <div className="flex gap-3 justify-center">
          {FALLBACK_COURSES.map((c) => (
            <Link key={c.id} href={`/courses/${c.id}`}>
              <span className="btn-pro btn-pro-primary inline-block px-6 py-2">{c.title}</span>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  const courseLessons = FALLBACK_COURSES.find((c) => c.id === lesson.courseId)?.lessons ?? [];
  const currentIndex = courseLessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? courseLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < courseLessons.length - 1 ? courseLessons[currentIndex + 1] : null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8">
        <p className="text-sm text-muted-foreground mb-1">{lesson.courseTitle}</p>
        <h1 className="text-2xl font-bold mb-2">第 {lesson.sortOrder} 节 · {lesson.title}</h1>
        <span className="badge-pro bg-primary/10 text-primary">{lesson.coreThinking}</span>
      </div>

      <div className="flex items-center justify-between mb-8">
        {prevLesson ? (
          <Link href={`/courses/${lesson.courseId}/learn?lesson=${prevLesson.id}`}>
            <span className="text-sm text-muted-foreground hover:text-primary">← {prevLesson.title}</span>
          </Link>
        ) : <div />}
        <span className="text-sm text-muted-foreground">{currentIndex + 1} / {courseLessons.length}</span>
        {nextLesson ? (
          <Link href={`/courses/${lesson.courseId}/learn?lesson=${nextLesson.id}`}>
            <span className="text-sm text-muted-foreground hover:text-primary">{nextLesson.title} →</span>
          </Link>
        ) : <div />}
      </div>

      <div className="space-y-6">
        <div className="bg-muted rounded-xl p-8 text-center">
          <p className="text-5xl mb-4">
            {lesson.workflowType === "sketch-refine" ? "✏️" :
             lesson.workflowType === "color-compare" ? "🎨" :
             lesson.workflowType === "spatial-factory" ? "🏗️" :
             lesson.workflowType === "style-transfer" ? "🖼️" :
             lesson.workflowType === "expression-solver" ? "💡" :
             lesson.workflowType === "character-consistency" ? "🎭" :
             lesson.workflowType === "tile-verify" ? "🔲" :
             lesson.workflowType === "texture-reference" ? "🧵" : "🎯"}
          </p>
          <h2 className="text-xl font-bold mb-2">核心思维训练</h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">{lesson.coreThinking}</p>
        </div>

        <div className="bg-white rounded-xl border border-border p-6">
          <h3 className="font-bold mb-3">课程内容即将上线</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            本节课的完整教学内容（三段式教学：灵感 → 共创 → 输出）正在从课程文档中导入。
            届时将包含：AI Prompt 模板、孩子操作步骤、教师指导要点。
          </p>
        </div>

        <div className="bg-muted rounded-full h-2 overflow-hidden">
          <div
            className="bg-primary h-full rounded-full transition-all"
            style={{ width: `${((currentIndex + 1) / courseLessons.length) * 100}%` }}
          />
        </div>
        <p className="text-center text-xs text-muted-foreground">
          课程进度 {currentIndex + 1}/{courseLessons.length}
        </p>
      </div>

      <div className="mt-8 text-center">
        <Link href={`/courses/${lesson.courseId}`}>
          <span className="btn-pro btn-pro-outline inline-block px-8 py-2.5">返回课程目录</span>
        </Link>
      </div>
    </div>
  );
}
