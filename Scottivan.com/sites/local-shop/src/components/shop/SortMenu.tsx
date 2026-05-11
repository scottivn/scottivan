"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export type SortKey = "newest" | "price-asc" | "price-desc" | "name";

const SORT_LABELS: Record<SortKey, string> = {
  newest: "Newest",
  "price-asc": "Price · low to high",
  "price-desc": "Price · high to low",
  name: "Name · A to Z",
};

interface SortMenuProps {
  value: SortKey;
  onChange: (next: SortKey) => void;
  className?: string;
}

export function SortMenu({ value, onChange, className }: SortMenuProps) {
  return (
    <label className={cn("inline-flex items-center gap-2", className)}>
      <span className="eyebrow shrink-0">Sort</span>
      <span className="relative inline-block">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as SortKey)}
          className={cn(
            "appearance-none rounded-full border border-rule bg-surface pl-3 pr-8 py-1.5 text-small font-medium text-ink",
            "focus-visible:outline-none focus-visible:shadow-focus hover:border-rule-strong transition-colors duration-fast",
          )}
        >
          {(Object.keys(SORT_LABELS) as SortKey[]).map((key) => (
            <option key={key} value={key}>
              {SORT_LABELS[key]}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-2"
          aria-hidden
        />
      </span>
    </label>
  );
}
