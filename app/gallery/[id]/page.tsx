import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDate, formatCount, assetUrl } from "@/lib/utils";
import { FALLBACK_TEACHER_WORKS, FALLBACK_WORKS } from "@/lib/data/fallback";

export function generateStaticParams() {
  return [...FALLBACK_TEACHER_WORKS, ...FALLBACK_WORKS].map((w) => ({ id: w.id }));
}

export default async function WorkDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const work = FALLBACK_TEACHER_WORKS.find((w) => w.id === id) ?? FALLBACK_WORKS.find((w) => w.id === id);
  if (!work) notFound();

  const studentWorks = FALLBACK_WORKS.filter((w) => w.lesson?.title === work.lesson?.title);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {work.isFeatured && (
                <Badge className="bg-amber-50 text-amber-700 border-amber-200">★ 精选</Badge>
              )}
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">{work.title}</h1>
            <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-[10px] font-bold">
                    {work.profile.nickname?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="font-semibold">{work.profile.nickname}</span>
              </span>
              <span>·</span>
              <span>{formatDate(work.createdAt)}</span>
            </div>
          </div>

          {work.finalWorkUrl && (
            <div className="rounded-xl overflow-hidden relative aspect-[4/3]">
              <Image
                src={assetUrl(work.finalWorkUrl)}
                alt={work.title}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover filter saturate-[0.85] contrast-[1.05] brightness-[1.02]"
              />
            </div>
          )}

          {work.gallery && work.gallery.length > 0 && (
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-3">作品图集</h3>
              <div className="grid grid-cols-2 gap-3">
                {work.gallery.map((img, i) => (
                  <div key={i} className="aspect-[4/3] rounded-xl border overflow-hidden bg-muted relative">
                    <Image
                      src={assetUrl(img)}
                      alt={`${work.title} ${i + 1}`}
                      fill
                      sizes="(max-width: 640px) 50vw, 33vw"
                      className="object-cover filter saturate-[0.85] contrast-[1.05] brightness-[1.02]"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {work.story && (
            <div className="rounded-xl bg-muted p-5">
              <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-2">创作故事</h3>
              <p className="leading-relaxed">{work.story}</p>
            </div>
          )}

          {studentWorks.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">学员作品</h3>
                <span className="text-xs text-muted-foreground">({studentWorks.length})</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {studentWorks.map((s) => (
                  <Link key={s.id} href={`/gallery/${s.id}`}>
                    <div className="rounded-2xl bg-card shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 transition-all overflow-hidden cursor-pointer">
                      <div className="aspect-[4/3] overflow-hidden relative">
                        <Image
                          src={assetUrl(s.finalWorkUrl)}
                          alt={s.title}
                          fill
                          sizes="(max-width: 640px) 50vw, 33vw"
                          className="object-cover filter saturate-[0.85] contrast-[1.05] brightness-[1.02]"
                        />
                      </div>
                      <div className="p-3">
                        <p className="font-semibold text-sm">{s.title}</p>
                        <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
                          <Avatar className="h-5 w-5">
                            <AvatarFallback className="text-[9px] font-bold">
                              {s.profile.nickname?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span>{s.profile.nickname}</span>
                          <span className="ml-auto">❤️ {formatCount(s.likesCount)}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="rounded-xl bg-muted p-5">
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="text-lg font-bold border border-border bg-white">
                  {work.profile.nickname?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-bold">{work.profile.nickname}</p>
                <p className="text-sm text-muted-foreground">小小创作者</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span>❤️ {formatCount(work.likesCount)} 赞</span>
              <span>💬 {formatCount(work.commentsCount)} 评论</span>
            </div>
          </div>

          {work.lesson && (
            <div className="rounded-xl bg-muted p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">所属课程</p>
              <p className="font-semibold">{work.lesson.title}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
