import Image from "next/image";
import { assetUrl } from "@/lib/utils";

interface SkillCardMiniProps {
  name: string;
  rarity: "COMMON" | "RARE" | "EPIC" | "LEGENDARY";
  description?: string;
  unlocked?: boolean;
  image?: string;
}

const rarityBadge: Record<string, string> = {
  COMMON: "普通",
  RARE: "稀有",
  EPIC: "史诗",
  LEGENDARY: "传说",
};

const rarityEmoji: Record<string, string> = {
  COMMON: "🌟",
  RARE: "💫",
  EPIC: "✨",
  LEGENDARY: "👑",
};

const rarityBadgeColor: Record<string, string> = {
  COMMON: "bg-gray-100 text-gray-600",
  RARE: "bg-blue-100 text-blue-600",
  EPIC: "bg-purple-100 text-purple-600",
  LEGENDARY: "bg-amber-100 text-amber-700",
};

const rarityBorder: Record<string, string> = {
  COMMON: "border-[#c0c5cc]",
  RARE: "border-blue-400",
  EPIC: "border-purple-400",
  LEGENDARY: "border-amber-400",
};

export function SkillCardMini({ name, rarity, description, unlocked = true, image }: SkillCardMiniProps) {
  if (image) {
    return (
      <div className={`card-sketch overflow-hidden border-2 transition-all hover:-translate-y-0.5 ${
        unlocked ? rarityBorder[rarity] ?? rarityBorder.COMMON : "border-border opacity-50 grayscale"
      }`}>
        <div className="aspect-[3/4] relative bg-muted">
          <Image src={assetUrl(image)} alt={name} fill sizes="25vw" className="object-cover img-bright" />
          {/* 稀有度图标 */}
          <span className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-sm shadow-sm">
            {rarityEmoji[rarity]}
          </span>
        </div>
        <div className="p-2.5 text-center bg-card space-y-1">
          <p className="font-bold text-xs truncate">{name}</p>
          <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${rarityBadgeColor[rarity]}`}>
            {rarityEmoji[rarity]} {rarityBadge[rarity]}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl border p-4 text-center transition-all ${
        unlocked
          ? {
              COMMON: "border-[#d1d5db] bg-white shadow-sm",
              RARE: "border-blue-200 bg-blue-50 text-blue-700",
              EPIC: "border-purple-200 bg-purple-50 text-purple-700",
              LEGENDARY: "border-amber-200 bg-amber-50 text-amber-700",
            }[rarity] ?? "border-border bg-muted"
          : "border-border bg-muted/50 opacity-60 grayscale"
      }`}
    >
      <p
        className={`text-3xl mb-1.5 ${
          rarity === "LEGENDARY" ? "animate-bounce" : ""
        }`}
      >
        {rarityEmoji[rarity]}
      </p>
      <p className={`font-bold text-sm ${!unlocked ? "text-muted-foreground" : ""}`}>
        {name}
      </p>
      <span className={`inline-block mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold ${rarityBadgeColor[rarity]}`}>
        {rarityBadge[rarity]}
      </span>
      {description && (
        <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed line-clamp-2">
          {description}
        </p>
      )}
      {!unlocked && (
        <p className="text-[10px] text-muted-foreground mt-2">🔒 未解锁</p>
      )}
    </div>
  );
}
