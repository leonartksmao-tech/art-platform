import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { FALLBACK_TEACHER_WORKS, FALLBACK_WORKS } from "@/lib/data/fallback";

export const dynamic = "force-dynamic";

export default async function WorkDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const work = FALLBACK_TEACHER_WORKS.find((w) => w.id === id) ?? FALLBACK_WORKS.find((w) => w.id === id);
  if (!work) notFound();

  // Find student works for the same lesson (for teacher works)
  const studentWorks = FALLBACK_WORKS.filter((w) => w.lesson?.title === work.lesson?.title);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {work.isFeatured && <span className="badge-pro bg-amber-100 text-amber-700">★ 精选</span>}
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">{work.title}</h1>
            <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-[10px] font-bold">
                  {work.profile.nickname?.charAt(0)}
                </span>
                <span className="font-semibold">{work.profile.nickname}</span>
              </span>
              <span>·</span>
              <span>{formatDate(work.createdAt)}</span>
            </div>
          </div>

          {/* 主作品大图 */}
          {work.finalWorkUrl && (
            <div className="rounded-xl overflow-hidden">
              <img
                src={work.finalWorkUrl}
                alt={work.title}
                className="w-full object-cover filter saturate-[0.85] contrast-[1.05] brightness-[1.02]"
              />
            </div>
          )}

          {/* 作品图集 */}
          {work.gallery && work.gallery.length > 0 && (
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-3">作品图集</h3>
              <div className="grid grid-cols-2 gap-3">
                {work.gallery.map((img, i) => (
                  <div key={i} className="aspect-[4/3] rounded-xl border border-border overflow-hidden bg-muted">
                    <img
                      src={img}
                      alt={`${work.title} ${i + 1}`}
                      className="w-full h-full object-cover filter saturate-[0.85] contrast-[1.05] brightness-[1.02]"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {work.story && (
            <div className="bg-muted rounded-xl p-5">
              <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-2">创作故事</h3>
              <p className="leading-relaxed">{work.story}</p>
            </div>
          )}

          {/* 学员作品 */}
          {studentWorks.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">学员作品</h3>
                <span className="text-xs text-muted-foreground">({studentWorks.length})</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {studentWorks.map((s) => (
                  <Link key={s.id} href={`/gallery/${s.id}`}>
                    <div className="card-pro h-full cursor-pointer">
                      <div className="aspect-[4/3] overflow-hidden rounded-t-xl">
                        <img
                          src={s.finalWorkUrl}
                          alt={s.title}
                          className="w-full h-full object-cover filter saturate-[0.85] contrast-[1.05] brightness-[1.02]"
                        />
                      </div>
                      <div className="p-3">
                        <p className="font-semibold text-sm">{s.title}</p>
                        <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[9px] font-bold">
                            {s.profile.nickname?.charAt(0)}
                          </span>
                          <span>{s.profile.nickname}</span>
                          <span className="ml-auto">❤️ {s.likesCount}</span>
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
          <div className="bg-muted rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-lg font-bold border border-border">
                {work.profile.nickname?.charAt(0)}
              </span>
              <div>
                <p className="font-bold">{work.profile.nickname}</p>
                <p className="text-sm text-muted-foreground">小小创作者</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span>❤️ {work.likesCount} 赞</span>
              <span>💬 {work.commentsCount} 评论</span>
            </div>
          </div>

          {work.lesson && (
            <div className="bg-muted rounded-xl p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">所属课程</p>
              <p className="font-semibold">{work.lesson.title}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
