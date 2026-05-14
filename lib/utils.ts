import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function assetUrl(path: string): string {
  if (!path) return path;
  const prefix = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${prefix}${path}`;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function timeAgo(date: Date | string) {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHour = Math.floor(diffMs / 3600000);
  const diffDay = Math.floor(diffMs / 86400000);

  if (diffMin < 1) return "刚刚";
  if (diffMin < 60) return `${diffMin} 分钟前`;
  if (diffHour < 24) return `${diffHour} 小时前`;
  if (diffDay < 7) return `${diffDay} 天前`;
  return formatDate(date);
}

export function formatCount(n: number): string {
  if (n >= 10000) return (n / 10000).toFixed(1).replace(".0", "") + "万";
  if (n >= 1000) return (n / 1000).toFixed(1).replace(".0", "") + "k";
  return String(n);
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}分钟`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}小时${m}分钟` : `${h}小时`;
}

const WORKFLOW_ICONS: Record<string, string> = {
  "sketch-refine": "✏️",
  "color-compare": "🎨",
  "spatial-factory": "🏗️",
  "style-transfer": "🖼️",
  "expression-solver": "💡",
  "character-consistency": "🎭",
  "tile-verify": "🔲",
  "texture-reference": "🧵",
};

export function getLessonIcon(workflowType: string): string {
  return WORKFLOW_ICONS[workflowType] ?? "🎯";
}
