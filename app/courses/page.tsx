"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { FilterPills } from "@/components/filter-pills";
import { CourseCard } from "@/components/course-card";
import { FALLBACK_COURSES } from "@/lib/data/fallback";
import { BookOpen } from "lucide-react";
import Link from "next/link";

const filterOptions = [
  { label: "全部", value: "all" },
  { label: "创作课", value: "CREATIVE" },
  { label: "基础课", value: "BASIC" },
];

export default function CoursesPage() {
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(
    () =>
      filter === "all"
        ? FALLBACK_COURSES
        : FALLBACK_COURSES.filter((c) => c.category === filter),
    [filter]
  );

  return (
    <div>
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">课程大厅</h1>
          <p className="mt-3 text-muted-foreground text-lg">两大体系 21 节课，从基础能力到创造性思维</p>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <FilterPills options={filterOptions} selected={filter} onSelect={setFilter} />
            <Button variant="ghost" size="sm" asChild>
              <Link href="/courses" className="gap-1.5">
                <BookOpen className="h-4 w-4" /> 全部课程
              </Link>
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {filtered.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
