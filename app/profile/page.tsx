import Link from "next/link";
import Image from "next/image";
import { assetUrl } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Star, Award, Zap } from "lucide-react";
import { FALLBACK_SKILL_CARDS, FALLBACK_TEACHER_WORKS, FALLBACK_WORKS } from "@/lib/data/fallback";

export default function ProfilePage() {
  const demoProfile = {
    nickname: "小创作者",
    bio: "小小创作者",
    level: { level: 1, name: "初学者" },
    exp: 120,
    nextLevel: { level: 2, name: "探索者" },
    nextExpRequired: 300,
    progress: 40,
  };

  const completedLessons = 5;
  const totalLessons = 21;
  const allWorks = [...FALLBACK_TEACHER_WORKS, ...FALLBACK_WORKS].slice(0, 4);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-xl">创</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-xl font-bold">{demoProfile.nickname}</h1>
              <p className="text-sm text-muted-foreground">{demoProfile.bio}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="gap-1">
                  <Zap className="h-3 w-3" />Lv.{demoProfile.level.level} {demoProfile.level.name}
                </Badge>
                <span className="text-xs text-muted-foreground">{demoProfile.exp} EXP</span>
              </div>
            </div>
          </div>
          <Progress value={demoProfile.progress} className="mt-4" />
          <p className="text-xs text-muted-foreground mt-1">
            距离 Lv.{demoProfile.nextLevel.level} {demoProfile.nextLevel.name} 还需 {demoProfile.nextExpRequired - demoProfile.exp} EXP
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Link href="/profile/courses">
          <Card className="hover:shadow transition-shadow cursor-pointer">
            <CardContent className="pt-6 text-center">
              <BookOpen className="mx-auto h-6 w-6 text-primary mb-2" />
              <p className="text-2xl font-bold">{completedLessons}<span className="text-sm text-muted-foreground">/{totalLessons}</span></p>
              <p className="text-xs text-muted-foreground">完成课程</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/profile/works">
          <Card className="hover:shadow transition-shadow cursor-pointer">
            <CardContent className="pt-6 text-center">
              <Star className="mx-auto h-6 w-6 text-amber-500 mb-2" />
              <p className="text-2xl font-bold">{allWorks.length}</p>
              <p className="text-xs text-muted-foreground">作品</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/profile/skills">
          <Card className="hover:shadow transition-shadow cursor-pointer">
            <CardContent className="pt-6 text-center">
              <Award className="mx-auto h-6 w-6 text-purple-500 mb-2" />
              <p className="text-2xl font-bold">{completedLessons}<span className="text-sm text-muted-foreground">/21</span></p>
              <p className="text-xs text-muted-foreground">技能卡牌</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/profile/achievements">
          <Card className="hover:shadow transition-shadow cursor-pointer">
            <CardContent className="pt-6 text-center">
              <Award className="mx-auto h-6 w-6 text-green-500 mb-2" />
              <p className="text-2xl font-bold">3<span className="text-sm text-muted-foreground">/12</span></p>
              <p className="text-xs text-muted-foreground">成就</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base">技能卡牌</CardTitle>
            <CardDescription>已完成课程获得的卡牌</CardDescription>
          </div>
          <Link href="/profile/skills"><Button variant="ghost" size="sm">查看全部</Button></Link>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {FALLBACK_SKILL_CARDS.slice(0, 5).map((skill) => (
              <Badge key={skill.name} variant={skill.rarity === "LEGENDARY" ? "default" : "secondary"}>
                {skill.name}
              </Badge>
            ))}
            <Badge variant="outline">+{FALLBACK_SKILL_CARDS.length - 5} 更多</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base">最近作品</CardTitle>
            <CardDescription>你的创作记录</CardDescription>
          </div>
          <Link href="/profile/works"><Button variant="ghost" size="sm">查看全部</Button></Link>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {allWorks.map((work) => (
              <Link key={work.id} href={`/gallery/${work.id}`}>
                <div className="aspect-square bg-muted rounded-lg overflow-hidden relative">
                  {work.finalWorkUrl ? (
                    <Image src={assetUrl(work.finalWorkUrl)} alt={work.title} fill sizes="25vw" className="object-cover img-bright" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">暂无图片</div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
