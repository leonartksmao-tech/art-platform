"use client";

import { useState, useMemo } from "react";
import { FilterPills } from "@/components/filter-pills";
import { WorkCard } from "@/components/work-card";
import { FALLBACK_TEACHER_WORKS, FALLBACK_WORKS } from "@/lib/data/fallback";

const allWorks = [...FALLBACK_TEACHER_WORKS, ...FALLBACK_WORKS];

const filterOptions = [
  { label: "全部", value: "all" },
  { label: "精选", value: "featured" },
  { label: "教师示范", value: "teacher" },
  { label: "学员作品", value: "student" },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(() => {
    switch (filter) {
      case "featured":
        return allWorks.filter((w) => w.isFeatured);
      case "teacher":
        return FALLBACK_TEACHER_WORKS;
      case "student":
        return FALLBACK_WORKS;
      default:
        return allWorks;
    }
  }, [filter]);

  return (
    <div>
      <section className="bg-gradient-to-br from-[#1a1a2e] via-[#2d2d4a] to-[#3d3d5c] text-white py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">作品广场</h1>
          <p className="mt-3 text-white/60 text-lg">点击每件教师示范作品，查看学员们的创意成果</p>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <FilterPills options={filterOptions} selected={filter} onSelect={setFilter} className="mb-8" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((work) => (
              <WorkCard key={work.id} work={work} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
