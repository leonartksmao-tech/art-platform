"use client";

import { cn } from "@/lib/utils";

interface FilterPillsProps {
  options: { label: string; value: string }[];
  selected: string;
  onSelect: (value: string) => void;
  className?: string;
}

export function FilterPills({ options, selected, onSelect, className }: FilterPillsProps) {
  return (
    <div className={cn("flex overflow-x-auto gap-2 pb-2 no-scrollbar", className)}>
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onSelect(opt.value)}
          role="tab"
          aria-selected={opt.value === selected}
          data-active={opt.value === selected}
          className={cn(
            "flex-shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
            "hover:bg-muted/80",
            "data-[active=true]:bg-primary data-[active=true]:text-primary-foreground",
            "data-[active=false]:bg-muted data-[active=false]:text-muted-foreground"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
