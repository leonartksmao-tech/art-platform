import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { FALLBACK_TEACHER_WORKS } from "@/lib/data/fallback";

export default function GalleryPage() {
  const works = FALLBACK_TEACHER_WORKS;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-12">
        <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wider mb-2">教师示范</p>
        <h1 className="section-title text-4xl">作品广场</h1>
        <p className="mt-2 text-muted-foreground text-lg">点击每件教师示范作品，查看学员们的创意成果</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {works.map((work) => (
          <Link key={work.id} href={`/gallery/${work.id}`}>
            <div className="card-pro h-full cursor-pointer">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={work.finalWorkUrl} alt={work.title} className="w-full h-full object-cover filter saturate-[0.85] contrast-[1.05] brightness-[1.02]" />
                {work.isFeatured && (
                  <span className="absolute top-3 left-3 badge-pro bg-amber-500 text-white text-[10px]">★ 精选</span>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-xs font-bold">
                    {work.profile.nickname?.charAt(0)}
                  </span>
                  <span className="text-sm font-semibold">{work.profile.nickname}</span>
                </div>
                <h3 className="font-bold mb-1">{work.title}</h3>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>❤️ {work.likesCount}</span>
                  <span>💬 {work.commentsCount}</span>
                  <span className="ml-auto">{formatDate(work.createdAt)}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
