import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  if (!userId) return NextResponse.json({ error: "userId required" }, { status: 400 });

  const [allAchievements, userAchievements] = await Promise.all([
    prisma.achievement.findMany(),
    prisma.userAchievement.findMany({ where: { userId } }),
  ]);

  const unlockedIds = new Set(userAchievements.map((ua) => ua.achievementId));

  const achievements = allAchievements.map((achievement) => ({
    id: achievement.id,
    name: achievement.name,
    description: achievement.description,
    iconUrl: achievement.iconUrl,
    unlockRule: achievement.unlockRule,
    unlocked: unlockedIds.has(achievement.id),
    unlockedAt:
      userAchievements.find((ua) => ua.achievementId === achievement.id)
        ?.unlockedAt ?? null,
  }));

  return NextResponse.json({ achievements });
}
