import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import { LearnContent } from "./LearnContent";

export const dynamic = "force-dynamic";

async function getLesson(lessonId: string) {
  if (!lessonId || lessonId === "undefined") return null;
  try {
    return await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: { course: true, skillCard: true },
    });
  } catch {
    return null;
  }
}

async function getCourseLessons(courseId: string) {
  try {
    return await prisma.lesson.findMany({
      where: { courseId },
      orderBy: { sortOrder: "asc" },
    });
  } catch {
    return [];
  }
}

export default async function LearnPage({
  searchParams,
}: {
  searchParams: Promise<{ lesson?: string }>;
}) {
  const { lesson: lessonId } = await searchParams;

  if (!lessonId) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">请选择一节课</h1>
        <p className="text-muted-foreground">从课程列表中选择一节课开始学习</p>
      </div>
    );
  }

  const lesson = await getLesson(lessonId);
  if (!lesson) notFound();

  const courseLessons = await getCourseLessons(lesson.courseId);

  return <LearnContent lesson={JSON.parse(JSON.stringify(lesson))} courseLessons={JSON.parse(JSON.stringify(courseLessons))} />;
}
