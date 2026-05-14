import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FALLBACK_SKILL_CARDS } from "@/lib/data/fallback";
import Image from "next/image";
import { assetUrl } from "@/lib/utils";

export default function SkillsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">技能卡牌</h1>
        <p className="text-muted-foreground">完成课程解锁卡牌，每张代表一种核心创作能力</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {FALLBACK_SKILL_CARDS.map((skill) => (
          <Card key={skill.name}>
            <CardContent className="pt-4 flex items-start gap-4">
              {skill.image ? (
                <div className="w-20 h-[105px] shrink-0 rounded-lg overflow-hidden relative bg-muted">
                  <Image src={assetUrl(skill.image)} alt={skill.name} fill sizes="80px" className="object-cover img-bright" />
                </div>
              ) : (
                <div className="w-20 h-[105px] shrink-0 rounded-lg bg-muted flex items-center justify-center">
                  <span className="text-2xl">🃏</span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-sm truncate">{skill.name}</p>
                  <Badge variant="outline" className="text-[10px] shrink-0">
                    {skill.rarity === "LEGENDARY" ? "传说" : skill.rarity === "EPIC" ? "史诗" : skill.rarity === "RARE" ? "稀有" : "普通"}
                  </Badge>
                </div>
                {skill.description && (
                  <p className="text-xs text-muted-foreground leading-relaxed">{skill.description}</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
