"use client";

import { X } from "lucide-react";
import type { DietaryTag } from "@/lib/types";
import { cn } from "@/lib/cn";

export interface Filters {
  dietary: DietaryTag[];
  inStockOnly: boolean;
  pickupEligible: boolean;
}

interface FilterBarProps {
  filters: Filters;
  onChange: (next: Filters) => void;
  className?: string;
}

const DIETARY_OPTIONS: { value: DietaryTag; label: string }[] = [
  { value: "vegan", label: "Vegan" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "gluten-free", label: "Gluten-free" },
  { value: "dairy-free", label: "Dairy-free" },
  { value: "nut-free", label: "Nut-free" },
  { value: "organic", label: "Organic" },
];

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-small transition-colors duration-fast",
        "focus-visible:outline-none focus-visible:shadow-focus",
        active
          ? "bg-accent text-on-accent border-accent"
          : "bg-surface text-ink-2 border-rule hover:border-rule-strong hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}

export function FilterBar({ filters, onChange, className }: FilterBarProps) {
  function toggleDietary(tag: DietaryTag) {
    onChange({
      ...filters,
      dietary: filters.dietary.includes(tag)
        ? filters.dietary.filter((t) => t !== tag)
        : [...filters.dietary, tag],
    });
  }

  const activeCount =
    filters.dietary.length +
    (filters.inStockOnly ? 1 : 0) +
    (filters.pickupEligible ? 1 : 0);

  function clear() {
    onChange({ dietary: [], inStockOnly: false, pickupEligible: false });
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <span className="eyebrow mr-1 hidden sm:inline">Filter</span>
      <Pill
        active={filters.inStockOnly}
        onClick={() =>
          onChange({ ...filters, inStockOnly: !filters.inStockOnly })
        }
      >
        In stock
      </Pill>
      <Pill
        active={filters.pickupEligible}
        onClick={() =>
          onChange({ ...filters, pickupEligible: !filters.pickupEligible })
        }
      >
        Pickup eligible
      </Pill>
      {DIETARY_OPTIONS.map((opt) => (
        <Pill
          key={opt.value}
          active={filters.dietary.includes(opt.value)}
          onClick={() => toggleDietary(opt.value)}
        >
          {opt.label}
        </Pill>
      ))}
      {activeCount > 0 ? (
        <button
          type="button"
          onClick={clear}
          className="inline-flex items-center gap-1 text-small text-ink-2 hover:text-accent transition-colors duration-fast ml-1 px-2 focus-visible:outline-none focus-visible:shadow-focus rounded"
        >
          <X className="h-3.5 w-3.5" aria-hidden />
          Clear ({activeCount})
        </button>
      ) : null}
    </div>
  );
}
