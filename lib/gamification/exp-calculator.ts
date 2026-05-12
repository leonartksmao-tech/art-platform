export const EXP_RULES = {
  LESSON_COMPLETE: 30,
  WORK_UPLOAD: 20,
  WORK_FEATURED: 50,
  TEN_LIKES: 10,
  COMMENT_POST: 5,
  STREAK_7_DAYS: 40,
} as const;

export interface LevelDefinition {
  level: number;
  name: string;
  expRequired: number;
}

export const LEVELS: LevelDefinition[] = [
  { level: 1, name: "小草芽", expRequired: 0 },
  { level: 2, name: "小画师", expRequired: 100 },
  { level: 3, name: "创作家", expRequired: 300 },
  { level: 4, name: "小导演", expRequired: 600 },
  { level: 5, name: "绘本大师", expRequired: 1000 },
];

export function getLevelInfo(exp: number) {
  let currentLevel: LevelDefinition = LEVELS[0];
  let nextLevel: LevelDefinition = LEVELS[1];

  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (exp >= LEVELS[i].expRequired) {
      currentLevel = LEVELS[i];
      nextLevel = LEVELS[i + 1] || LEVELS[i];
      break;
    }
  }

  const progress =
    nextLevel.level === currentLevel.level
      ? 100
      : Math.round(
          ((exp - currentLevel.expRequired) /
            (nextLevel.expRequired - currentLevel.expRequired)) *
            100,
        );

  return { currentLevel, nextLevel, progress };
}

export type ExpAction = keyof typeof EXP_RULES;
