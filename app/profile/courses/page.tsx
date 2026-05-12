"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, Play, Lock } from "lucide-react";

export default function MyCoursesPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/auth"); return; }
      const res = await fetch(`/api/profile?userId=${user.id}`);
      setData(await res.json());
      setLoading(false);
    })();
  }, []);

  if (loading) return <div className="mx-auto max-w-3xl px-4 py-8"><Skeleton className="h-64 w-full" /></div>;
  if (!data) return null;

  const statusIcon = (status: string) => {
    switch (status) {
      case "COMPLETED": return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "IN_PROGRESS": return <Play className="h-5 w-5 text-primary" />;
      case "UNLOCKED": return <Play className="h-5 w-5 text-muted-foreground" />;
      default: return <Lock className="h-5 w-5 text-muted-foreground/50" />;
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">我的课程</h1>
      <div className="space-y-2">
        {data.userLessons?.map((ul: any) => (
          <Link key={ul.id} href={`/courses/${ul.lesson.courseId}/learn?lesson=${ul.lessonId}`}>
            <Card className="hover:shadow transition-shadow cursor-pointer">
              <CardContent className="flex items-center gap-4 py-4">
                {statusIcon(ul.status)}
                <div className="flex-1">
                  <p className="font-medium">{ul.lesson.title}</p>
                  <p className="text-xs text-muted-foreground">{ul.lesson.coreThinking}</p>
                </div>
                <Badge variant={ul.status === "COMPLETED" ? "default" : "outline"}>
                  {ul.status === "COMPLETED" ? "已完成" : ul.status === "IN_PROGRESS" ? "进行中" : "未开始"}
                </Badge>
              </CardContent>
            </Card>
          </Link>
        ))}
        {(!data.userLessons || data.userLessons.length === 0) && (
          <p className="text-center text-muted-foreground py-12">还没有开始任何课程</p>
        )}
      </div>
    </div>
  );
}
