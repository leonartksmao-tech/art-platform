"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Award, Lock } from "lucide-react";

export default function SkillsPage() {
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/auth"); return; }
      const res = await fetch(`/api/skills?userId=${user.id}`);
      const json = await res.json();
      setSkills(json.skills);
      setLoading(false);
    })();
  }, []);

  if (loading) return <div className="mx-auto max-w-3xl px-4 py-8"><Skeleton className="h-64 w-full" /></div>;

  const rarityLabel: Record<string, string> = { COMMON: "普通", RARE: "稀有", EPIC: "史诗", LEGENDARY: "传说" };
  const rarityVariant: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
    COMMON: "outline", RARE: "secondary", EPIC: "default", LEGENDARY: "destructive"
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">技能卡牌</h1>
        <p className="text-muted-foreground">完成课程解锁卡牌，每张代表一种核心创作能力</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {skills.map((skill: any) => (
          <Card key={skill.id} className={skill.earned ? "border-primary/30" : "opacity-50"}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {skill.earned ? <Award className="h-5 w-5 text-primary" /> : <Lock className="h-5 w-5 text-muted-foreground" />}
                  <CardTitle className="text-base">{skill.name}</CardTitle>
                </div>
                <Badge variant={rarityVariant[skill.rarity] ?? "outline"}>{rarityLabel[skill.rarity]}</Badge>
              </div>
              <CardDescription className="text-sm">{skill.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
