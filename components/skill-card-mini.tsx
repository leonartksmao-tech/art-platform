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
  COMMON: "bg-gradient-to-r from-gray-300 to-gray-400 text-white shadow-sm",
  RARE: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md shadow-blue-500/30",
  EPIC: "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md shadow-purple-500/30",
  LEGENDARY: "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-400/40 animate-pulse",
};

const rarityBorder: Record<string, string> = {
  COMMON: "border-gray-300",
  RARE: "border-blue-400 shadow-lg shadow-blue-500/15",
  EPIC: "border-purple-400 shadow-lg shadow-purple-500/20",
  LEGENDARY: "border-amber-400 shadow-xl shadow-amber-400/25 ring-1 ring-amber-300/50",
};

const rarityGlow: Record<string, string> = {
  COMMON: "",
  RARE: "bg-gradient-to-t from-blue-50 to-transparent",
  EPIC: "bg-gradient-to-t from-purple-50 to-transparent",
  LEGENDARY: "bg-gradient-to-t from-amber-100 to-transparent",
};

export function SkillCardMini({ name, rarity, description, unlocked = true, image }: SkillCardMiniProps) {
  if (image) {
    return (
      <div className={`card-sketch overflow-hidden border-2 transition-all hover:-translate-y-0.5 ${
        unlocked ? rarityBorder[rarity] ?? rarityBorder.COMMON : "border-border opacity-50 grayscale"
      } ${unlocked ? rarityGlow[rarity] : ""}`}>
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
      className={`rounded-xl border-2 p-4 text-center transition-all ${
        unlocked
          ? {
              COMMON: "border-gray-300 bg-white shadow-sm",
              RARE: "border-blue-400 bg-gradient-to-b from-blue-50 to-white shadow-lg shadow-blue-400/20",
              EPIC: "border-purple-400 bg-gradient-to-b from-purple-50 to-white shadow-lg shadow-purple-400/20",
              LEGENDARY: "border-amber-400 bg-gradient-to-b from-amber-50 to-white shadow-xl shadow-amber-400/30 ring-1 ring-amber-300/50 animate-pulse",
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
