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

const rarityBorder: Record<string, string> = {
  COMMON: "border-gray-300",
  RARE: "border-blue-400",
  EPIC: "border-purple-400",
  LEGENDARY: "border-amber-400",
};

export function SkillCardMini({ name, rarity, description, unlocked = true, image }: SkillCardMiniProps) {
  if (image) {
    return (
      <div className={`rounded-xl overflow-hidden border-2 transition-all hover:-translate-y-0.5 hover:shadow-lg ${
        unlocked ? rarityBorder[rarity] ?? rarityBorder.COMMON : "border-border opacity-50 grayscale"
      }`}>
        <div className="aspect-[3/4] relative bg-muted">
          <Image src={assetUrl(image)} alt={name} fill sizes="25vw" className="object-cover" />
        </div>
        <div className="p-2 text-center bg-card">
          <p className="font-bold text-xs truncate">{name}</p>
          <span className={`text-[10px] font-semibold uppercase tracking-wider ${
            unlocked ? "text-muted-foreground" : "text-muted-foreground"
          }`}>{rarityBadge[rarity]}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl border p-4 text-center transition-all ${
        unlocked
          ? {
              COMMON: "border-border bg-muted",
              RARE: "border-blue-200 bg-blue-50 text-blue-700",
              EPIC: "border-purple-200 bg-purple-50 text-purple-700",
              LEGENDARY: "border-amber-200 bg-amber-50 text-amber-700",
            }[rarity] ?? "border-border bg-muted"
          : "border-border bg-muted/50 opacity-60 grayscale"
      }`}
    >
      <p
        className={`text-2xl mb-1 ${
          rarity === "LEGENDARY" ? "animate-pulse" : ""
        }`}
      >
        {rarity === "LEGENDARY" ? "👑" : rarity === "EPIC" ? "💎" : rarity === "RARE" ? "⭐" : "🔹"}
      </p>
      <p className={`font-bold text-sm ${!unlocked ? "text-muted-foreground" : ""}`}>
        {name}
      </p>
      <span
        className={`inline-block mt-1 text-[10px] font-semibold uppercase tracking-wider ${
          unlocked ? "opacity-60" : "text-muted-foreground"
        }`}
      >
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
