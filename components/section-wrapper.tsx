import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionProps {
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  viewAllText?: string;
  variant?: "default" | "muted" | "accent";
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<string, string> = {
  default: "bg-background",
  muted: "bg-muted",
  accent: "bg-accent text-accent-foreground",
};

const subtitleStyles: Record<string, string> = {
  default: "text-muted-foreground",
  muted: "text-muted-foreground",
  accent: "text-white/60",
};

export function Section({
  title,
  subtitle,
  viewAllHref,
  viewAllText = "查看全部",
  variant = "default",
  className,
  children,
}: SectionProps) {
  return (
    <section className={cn(variantStyles[variant], "py-14 sm:py-20", className)}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg tilt-1">🎨</span>
              <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground/50">央美学院派</span>
            </div>
            <h2 className="sketch-title-underline font-sketch text-2xl sm:text-3xl font-extrabold tracking-tight">{title}</h2>
            {subtitle && <p className={subtitleStyles[variant] + " mt-1"}>{subtitle}</p>}
            </div>
          {viewAllHref && (
            <Button variant="ghost" size="sm" asChild>
              <Link href={viewAllHref} className="gap-1">
                {viewAllText} <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
