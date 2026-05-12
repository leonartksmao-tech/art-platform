import { prisma } from "@/lib/db/prisma";

type UnlockRule = {
  type: string;
  value?: number;
  course?: string;
  workType?: string;
};

export async function checkAchievements(userId: string) {
  const achievements = await prisma.achievement.findMany();
  const userAchievements = await prisma.userAchievement.findMany({
    where: { userId },
    select: { achievementId: true },
  });
  const unlockedIds = new Set(userAchievements.map((ua) => ua.achievementId));

  const newlyUnlocked: string[] = [];

  for (const achievement of achievements) {
    if (unlockedIds.has(achievement.id)) continue;

    const rule: UnlockRule = JSON.parse(achievement.unlockRule);
    const isUnlocked = await evaluateRule(userId, rule);

    if (isUnlocked) {
      await prisma.userAchievement.create({
        data: { userId, achievementId: achievement.id },
      });

      // Award EXP
      await prisma.userLevel.upsert({
        where: { userId },
        update: { exp: { increment: 15 } },
        create: { userId, exp: 15, nextLevelExp: 100 },
      });

      newlyUnlocked.push(achievement.name);
    }
  }

  return newlyUnlocked;
}

async function evaluateRule(
  userId: string,
  rule: UnlockRule,
): Promise<boolean> {
  switch (rule.type) {
    case "lesson_count": {
      const count = await prisma.userLesson.count({
        where: { userId, status: "COMPLETED" },
      });
      return count >= (rule.value ?? 1);
    }
    case "course_complete": {
      const lessons = await prisma.lesson.findMany({
        where: {
          course: { category: rule.course === "creative" ? "CREATIVE" : "BASIC" },
        },
        select: { id: true },
      });
      const completedCount = await prisma.userLesson.count({
        where: {
          userId,
          lessonId: { in: lessons.map((l) => l.id) },
          status: "COMPLETED",
        },
      });
      return completedCount >= lessons.length;
    }
    case "all_lessons_complete": {
      const totalLessons = await prisma.lesson.count();
      const completed = await prisma.userLesson.count({
        where: { userId, status: "COMPLETED" },
      });
      return completed >= totalLessons;
    }
    case "comment_count": {
      const count = await prisma.comment.count({ where: { userId } });
      return count >= (rule.value ?? 1);
    }
    case "total_likes": {
      const result = await prisma.work.aggregate({
        where: { userId },
        _sum: { likesCount: true },
      });
      return (result._sum.likesCount ?? 0) >= (rule.value ?? 1);
    }
    case "featured_count": {
      const count = await prisma.work.count({
        where: { userId, isFeatured: true },
      });
      return count >= (rule.value ?? 1);
    }
    case "streak_days": {
      const recentLessons = await prisma.userLesson.findMany({
        where: { userId, status: "COMPLETED" },
        orderBy: { completedAt: "desc" },
        take: 30,
      });
      if (recentLessons.length < (rule.value ?? 1)) return false;

      let streak = 1;
      for (let i = 1; i < recentLessons.length; i++) {
        const prev = new Date(recentLessons[i - 1].completedAt!);
        const curr = new Date(recentLessons[i].completedAt!);
        const diffDays =
          (prev.getTime() - curr.getTime()) / (1000 * 60 * 60 * 24);
        if (Math.abs(diffDays - 1) < 0.1) {
          streak++;
          if (streak >= (rule.value ?? 1)) return true;
        } else {
          streak = 1;
        }
      }
      return false;
    }
    case "skill_count": {
      const count = await prisma.userSkill.count({ where: { userId } });
      return count >= (rule.value ?? 1);
    }
    case "work_type": {
      const count = await prisma.work.count({
        where: { userId, lesson: { workflowType: rule.workType } },
      });
      return count > 0;
    }
    case "ai_generation_count": {
      const count = await prisma.work.count({
        where: { userId, aiGeneratedUrl: { not: null } },
      });
      return count >= (rule.value ?? 1);
    }
    case "teacher_featured": {
      const count = await prisma.work.count({
        where: { userId, isFeatured: true },
      });
      return count > 0;
    }
    default:
      return false;
  }
}
