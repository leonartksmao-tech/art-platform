import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatCount, assetUrl } from "@/lib/utils";

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
      <div className="card-sketch bg-card hover:-translate-y-0.5 transition-all overflow-hidden">
        <div className="aspect-[4/3] overflow-hidden bg-muted relative">
          <Image
            src={assetUrl(work.finalWorkUrl)}
            alt={work.title}
            fill
            sizes="(max-width: 640px) 50vw, 33vw"
            className="object-cover img-bright group-hover:scale-105 transition-transform duration-300"
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
