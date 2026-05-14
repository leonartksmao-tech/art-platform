"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import Image from "next/image";
import { assetUrl } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Star, Award, Zap, Settings } from "lucide-react";

export default function ProfilePage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/auth"); return; }
      const res = await fetch(`/api/profile?userId=${user.id}`);
      const json = await res.json();
      setData(json);
      setLoading(false);
    })();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 space-y-6">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  if (!data) return null;

  const { profile, level, completedLessons, totalLessons, skills, achievements, works } = data;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 space-y-6">
      {/* User Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-xl">{profile?.nickname?.charAt(0) ?? "?"}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-xl font-bold">{profile?.nickname ?? "未设置昵称"}</h1>
              <p className="text-sm text-muted-foreground">{profile?.bio ?? "小小创作者"}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="gap-1">
                  <Zap className="h-3 w-3" />Lv.{level.currentLevel.level} {level.currentLevel.name}
                </Badge>
                <span className="text-xs text-muted-foreground">{level.exp} EXP</span>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleSignOut}>退出</Button>
          </div>
          <Progress value={level.progress} className="mt-4" />
          <p className="text-xs text-muted-foreground mt-1">
            距离 Lv.{level.nextLevel.level} {level.nextLevel.name} 还需 {level.nextLevel.expRequired - level.exp} EXP
          </p>
        </CardContent>
      </Card>

      {/* Stats Grid */}
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
              <p className="text-2xl font-bold">{works?.length ?? 0}</p>
              <p className="text-xs text-muted-foreground">作品</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/profile/skills">
          <Card className="hover:shadow transition-shadow cursor-pointer">
            <CardContent className="pt-6 text-center">
              <Award className="mx-auto h-6 w-6 text-purple-500 mb-2" />
              <p className="text-2xl font-bold">{skills?.length ?? 0}<span className="text-sm text-muted-foreground">/21</span></p>
              <p className="text-xs text-muted-foreground">技能卡牌</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/profile/achievements">
          <Card className="hover:shadow transition-shadow cursor-pointer">
            <CardContent className="pt-6 text-center">
              <Award className="mx-auto h-6 w-6 text-green-500 mb-2" />
              <p className="text-2xl font-bold">{achievements?.length ?? 0}<span className="text-sm text-muted-foreground">/12</span></p>
              <p className="text-xs text-muted-foreground">成就</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Skill Cards Preview */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base">技能卡牌</CardTitle>
            <CardDescription>已完成课程获得的卡牌</CardDescription>
          </div>
          <Link href="/profile/skills"><Button variant="ghost" size="sm">查看全部</Button></Link>
        </CardHeader>
        <CardContent>
          {skills?.length === 0 ? (
            <p className="text-sm text-muted-foreground">完成第一节课来获得你的第一张技能卡牌！</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {skills?.slice(0, 6).map((skill: any) => (
                <Badge key={skill.id} variant={skill.rarity === "LEGENDARY" ? "default" : "secondary"}>
                  {skill.name}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Works */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base">最近作品</CardTitle>
            <CardDescription>你的创作记录</CardDescription>
          </div>
          <Link href="/profile/works"><Button variant="ghost" size="sm">查看全部</Button></Link>
        </CardHeader>
        <CardContent>
          {works?.length === 0 ? (
            <p className="text-sm text-muted-foreground">完成一节课并上传你的第一个作品！</p>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {works?.slice(0, 4).map((work: any) => (
                <Link key={work.id} href={`/gallery/${work.id}`}>
                  <div className="aspect-square bg-muted rounded-lg overflow-hidden relative">
                    {work.finalWorkUrl ? (
                      <Image src={assetUrl(work.finalWorkUrl)} alt={work.title} fill sizes="25vw" className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">暂无图片</div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
