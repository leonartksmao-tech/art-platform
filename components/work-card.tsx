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
      <div className="card-academy overflow-hidden">
        <div className="aspect-[4/3] overflow-hidden bg-muted relative card-gradient-mask">
          <Image
            src={assetUrl(work.finalWorkUrl)}
            alt={work.title}
            fill
            sizes="(max-width: 640px) 50vw, 33vw"
            className="object-cover img-bright group-hover:scale-105 transition-transform duration-300"
          />
          {work.isFeatured && (
            <Badge className="absolute top-3 left-3 bg-primary text-white border-0 text-[10px] z-10">
              FEATURED
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
          <h3 className="font-bold text-xs uppercase tracking-tight line-clamp-1">{work.title}</h3>
          <div className="micro-data mt-1.5">
            <span>{formatCount(work.likesCount)} 赞</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
