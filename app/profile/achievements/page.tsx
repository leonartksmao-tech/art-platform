"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Trophy, Lock } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/auth"); return; }
      const res = await fetch(`/api/achievements?userId=${user.id}`);
      const json = await res.json();
      setAchievements(json.achievements);
      setLoading(false);
    })();
  }, []);

  if (loading) return <div className="mx-auto max-w-3xl px-4 py-8"><Skeleton className="h-64 w-full" /></div>;

  const unlocked = achievements.filter((a: any) => a.unlocked);
  const locked = achievements.filter((a: any) => !a.unlocked);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">成就墙</h1>
        <p className="text-muted-foreground">{unlocked.length} / {achievements.length} 个成就已解锁</p>
      </div>

      {/* Unlocked */}
      <h2 className="font-semibold mb-4 flex items-center gap-2"><Trophy className="h-5 w-5 text-amber-500" />已解锁</h2>
      <div className="grid sm:grid-cols-2 gap-3 mb-8">
        {unlocked.map((a: any) => (
          <Card key={a.id} className="border-amber-200 bg-amber-50/50">
            <CardContent className="pt-4 flex items-start gap-3">
              <Trophy className="h-8 w-8 text-amber-500 shrink-0" />
              <div>
                <p className="font-medium text-sm">{a.name}</p>
                <p className="text-xs text-muted-foreground">{a.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{formatDate(a.unlockedAt)}</p>
              </div>
            </CardContent>
          </Card>
        ))}
        {unlocked.length === 0 && <p className="text-sm text-muted-foreground col-span-2">还没有解锁任何成就，开始学习吧！</p>}
      </div>

      {/* Locked */}
      <h2 className="font-semibold mb-4 flex items-center gap-2"><Lock className="h-5 w-5 text-muted-foreground" />未解锁</h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {locked.map((a: any) => (
          <Card key={a.id} className="opacity-50">
            <CardContent className="pt-4 flex items-start gap-3">
              <Lock className="h-8 w-8 text-muted-foreground shrink-0" />
              <div>
                <p className="font-medium text-sm">{a.name}</p>
                <p className="text-xs text-muted-foreground">{a.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
