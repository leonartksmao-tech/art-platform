import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { checkAchievements } from "@/lib/gamification/achievement-checker";
import { EXP_RULES } from "@/lib/gamification/exp-calculator";


export async function POST(request: Request) {
  const { userId, lessonId, sketchUrl, aiGeneratedUrl, finalWorkUrl, title, story } = await request.json();

  const work = await prisma.work.create({
    data: { userId, lessonId, sketchUrl, aiGeneratedUrl, finalWorkUrl, title, story },
    include: { profile: true, lesson: true },
  });

  // Award EXP
  await prisma.userLevel.upsert({
    where: { userId },
    update: { exp: { increment: EXP_RULES.WORK_UPLOAD } },
    create: { userId, exp: EXP_RULES.WORK_UPLOAD, nextLevelExp: 100 },
  });

  const newAchievements = await checkAchievements(userId);

  return NextResponse.json({ work, newAchievements });
}
