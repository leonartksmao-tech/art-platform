import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { checkAchievements } from "@/lib/gamification/achievement-checker";
import { EXP_RULES } from "@/lib/gamification/exp-calculator";


export async function POST(request: Request) {
  try {
    const { lessonId, userId } = await request.json();

    // Upsert user_lesson
    const lesson = await prisma.lesson.findUnique({ where: { id: lessonId } });
    if (!lesson) return NextResponse.json({ error: "Lesson not found" }, { status: 404 });

    await prisma.userLesson.upsert({
      where: { userId_lessonId: { userId, lessonId } },
      update: { status: "COMPLETED", completedAt: new Date() },
      create: { userId, lessonId, status: "COMPLETED", completedAt: new Date() },
    });

    // Award EXP
    await prisma.userLevel.upsert({
      where: { userId },
      update: { exp: { increment: EXP_RULES.LESSON_COMPLETE } },
      create: { userId, exp: EXP_RULES.LESSON_COMPLETE, nextLevelExp: 100 },
    });

    // Award skill card
    const skillCard = await prisma.skillCard.findUnique({ where: { lessonId } });
    if (skillCard) {
      await prisma.userSkill.upsert({
        where: { userId_skillCardId: { userId, skillCardId: skillCard.id } },
        update: {},
        create: { userId, skillCardId: skillCard.id },
      });
    }

    // Check achievements
    const newAchievements = await checkAchievements(userId);

    return NextResponse.json({
      success: true,
      expAwarded: EXP_RULES.LESSON_COMPLETE,
      skillUnlocked: skillCard?.name ?? null,
      newAchievements,
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
