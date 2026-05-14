import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Lock } from "lucide-react";

const DEMO_ACHIEVEMENTS = [
  { id: "a1", name: "初次创作", description: "完成第一节课", unlocked: true, unlockedAt: "2026-03-01" },
  { id: "a2", name: "连续打卡 7 天", description: "连续 7 天完成课程", unlocked: true, unlockedAt: "2026-03-08" },
  { id: "a3", name: "收集初学者", description: "解锁 5 张技能卡牌", unlocked: true, unlockedAt: "2026-03-15" },
  { id: "a4", name: "图形大师", description: "完成基础课全部图形相关课程", unlocked: false },
  { id: "a5", name: "色彩专家", description: "完成全部色彩相关课程", unlocked: false },
  { id: "a6", name: "创作达人", description: "上传 10 个作品", unlocked: false },
  { id: "a7", name: "四方连续", description: "完成四方连续课程", unlocked: false },
  { id: "a8", name: "面具设计师", description: "完成面具设计课程", unlocked: false },
  { id: "a9", name: "动物王国", description: "完成动物贴纸课程", unlocked: false },
  { id: "a10", name: "人偶工匠", description: "完成人偶制作课程", unlocked: false },
  { id: "a11", name: "蝴蝶收藏家", description: "完成蝴蝶课程", unlocked: false },
  { id: "a12", name: "全能创作家", description: "完成全部 21 节课程", unlocked: false },
];

export default function AchievementsPage() {
  const unlocked = DEMO_ACHIEVEMENTS.filter((a) => a.unlocked);
  const locked = DEMO_ACHIEVEMENTS.filter((a) => !a.unlocked);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">成就墙</h1>
        <p className="text-muted-foreground">{unlocked.length} / {DEMO_ACHIEVEMENTS.length} 个成就已解锁</p>
      </div>

      <h2 className="font-semibold mb-4 flex items-center gap-2"><Trophy className="h-5 w-5 text-amber-500" />已解锁</h2>
      <div className="grid sm:grid-cols-2 gap-3 mb-8">
        {unlocked.map((a) => (
          <Card key={a.id} className="border-amber-200 bg-amber-50/50">
            <CardContent className="pt-4 flex items-start gap-3">
              <Trophy className="h-8 w-8 text-amber-500 shrink-0" />
              <div>
                <p className="font-medium text-sm">{a.name}</p>
                <p className="text-xs text-muted-foreground">{a.description}</p>
                {a.unlockedAt && <p className="text-xs text-muted-foreground mt-1">{a.unlockedAt}</p>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="font-semibold mb-4 flex items-center gap-2"><Lock className="h-5 w-5 text-muted-foreground" />未解锁</h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {locked.map((a) => (
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
