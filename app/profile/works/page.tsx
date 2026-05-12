"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, Heart } from "lucide-react";

export default function MyWorksPage() {
  const [works, setWorks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/auth"); return; }
      const res = await fetch(`/api/profile?userId=${user.id}`);
      const json = await res.json();
      setWorks(json.works ?? []);
      setLoading(false);
    })();
  }, []);

  if (loading) return <div className="mx-auto max-w-3xl px-4 py-8"><Skeleton className="h-64 w-full" /></div>;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">我的作品</h1>
      {works.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">还没有作品，完成一节课上传第一个作品吧！</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {works.map((work: any) => (
            <Link key={work.id} href={`/gallery/${work.id}`}>
              <Card className="hover:shadow transition-shadow cursor-pointer">
                <div className="aspect-square bg-muted rounded-t-xl overflow-hidden">
                  {work.finalWorkUrl ? (
                    <img src={work.finalWorkUrl} alt={work.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">暂无图片</div>
                  )}
                </div>
                <CardContent className="pt-3">
                  <p className="font-medium text-sm truncate">{work.title ?? "未命名"}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                    <span className="flex items-center gap-1"><Heart className="h-3 w-3" />{work.likesCount}</span>
                    {work.isFeatured && <Star className="h-3 w-3 text-amber-500 fill-amber-500" />}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
