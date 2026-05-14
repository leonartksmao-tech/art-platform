import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatCount } from "@/lib/utils";

interface Work {
  id: string;
  title: string;
  finalWorkUrl: string;
  likesCount: number;
  isFeatured: boolean;
  profile: { nickname: string };
}

export function WorkCard({ work }: { work: Work }) {
  return (
    <Link href={`/gallery/${work.id}`} className="group block">
      <div className="rounded-xl border bg-card shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all overflow-hidden">
        <div className="aspect-[4/3] overflow-hidden bg-muted relative">
          <img
            src={work.finalWorkUrl}
            alt={work.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 filter saturate-[0.85] contrast-[1.05] brightness-[1.02]"
            loading="lazy"
          />
          {work.isFeatured && (
            <Badge className="absolute top-3 left-3 bg-amber-500 text-white border-0 text-[10px]">
              ★ 精选
            </Badge>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-1.5">
            <Avatar className="h-5 w-5">
              <AvatarFallback className="text-[9px]">{work.profile.nickname?.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-xs font-medium text-muted-foreground">{work.profile.nickname}</span>
          </div>
          <h3 className="font-semibold text-sm line-clamp-1">{work.title}</h3>
          <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
            <span>❤️ {formatCount(work.likesCount)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
