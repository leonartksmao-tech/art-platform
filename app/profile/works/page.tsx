import Link from "next/link";
import Image from "next/image";
import { assetUrl } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Heart } from "lucide-react";
import { FALLBACK_WORKS, FALLBACK_TEACHER_WORKS } from "@/lib/data/fallback";

export default function MyWorksPage() {
  const allWorks = [...FALLBACK_TEACHER_WORKS, ...FALLBACK_WORKS];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">我的作品</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allWorks.map((work) => (
          <Link key={work.id} href={`/gallery/${work.id}`}>
            <Card className="hover:shadow transition-shadow cursor-pointer">
              <div className="aspect-square bg-muted rounded-t-xl overflow-hidden relative">
                {work.finalWorkUrl ? (
                  <Image src={assetUrl(work.finalWorkUrl)} alt={work.title} fill sizes="25vw" className="object-cover img-bright" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">暂无图片</div>
                )}
              </div>
              <CardContent className="pt-3">
                <p className="font-medium text-sm truncate">{work.title}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                  <span className="flex items-center gap-1"><Heart className="h-3 w-3" />{work.likesCount}</span>
                  {work.isFeatured && <Star className="h-3 w-3 text-amber-500 fill-amber-500" />}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
