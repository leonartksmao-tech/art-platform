import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getLevelInfo } from "@/lib/gamification/exp-calculator";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  if (!userId) return NextResponse.json({ error: "userId required" }, { status: 400 });

  const [profile, level, userLessons, userSkills, userAchievements, works] = await Promise.all([
    prisma.profile.findUnique({ where: { userId } }),
    prisma.userLevel.findUnique({ where: { userId } }),
    prisma.userLesson.findMany({ where: { userId }, include: { lesson: true } }),
    prisma.userSkill.findMany({ where: { userId }, include: { skillCard: true } }),
    prisma.userAchievement.findMany({ where: { userId }, include: { achievement: true } }),
    prisma.work.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, take: 12 }),
  ]);

  const levelInfo = getLevelInfo(level?.exp ?? 0);

  return NextResponse.json({
    profile,
    level: { exp: level?.exp ?? 0, ...levelInfo },
    completedLessons: userLessons.filter((ul) => ul.status === "COMPLETED").length,
    totalLessons: await prisma.lesson.count(),
    userLessons,
    skills: userSkills.map((us) => ({ ...us.skillCard, earnedAt: us.earnedAt })),
    achievements: userAchievements.map((ua) => ({ ...ua.achievement, unlockedAt: ua.unlockedAt })),
    works,
  });
}

export async function POST(request: Request) {
  const { userId, nickname } = await request.json();

  const profile = await prisma.profile.upsert({
    where: { userId },
    update: { nickname },
    create: { userId, nickname },
  });

  // Create level record
  await prisma.userLevel.upsert({
    where: { userId },
    update: {},
    create: { userId, exp: 0, nextLevelExp: 100 },
  });

  return NextResponse.json({ profile });
}
