import { Suspense } from "react";
import { FALLBACK_COURSES } from "@/lib/data/fallback";
import { LearnPageClient } from "./LearnPageClient";

export function generateStaticParams() {
  return FALLBACK_COURSES.map((c) => ({ id: c.id }));
}

export default function LearnPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-3xl px-4 py-16 text-center text-muted-foreground">加载中...</div>}>
      <LearnPageClient />
    </Suspense>
  );
}
