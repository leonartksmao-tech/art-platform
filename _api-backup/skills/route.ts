import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  if (!userId) return NextResponse.json({ error: "userId required" }, { status: 400 });

  const allSkillCards = await prisma.skillCard.findMany({
    include: { lesson: { include: { course: true } } },
  });

  const userSkills = await prisma.userSkill.findMany({
    where: { userId },
    select: { skillCardId: true, earnedAt: true },
  });
  const earnedIds = new Set(userSkills.map((us) => us.skillCardId));

  const skills = allSkillCards.map((sc) => ({
    ...sc,
    earned: earnedIds.has(sc.id),
    earnedAt: userSkills.find((us) => us.skillCardId === sc.id)?.earnedAt ?? null,
  }));

  return NextResponse.json({ skills });
}
