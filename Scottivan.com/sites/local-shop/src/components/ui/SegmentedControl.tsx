"use client";

import { cn } from "@/lib/cn";

interface SegmentOption<V extends string> {
  value: V;
  label: string;
  description?: string;
}

interface SegmentedControlProps<V extends string> {
  value: V;
  onChange: (next: V) => void;
  options: ReadonlyArray<SegmentOption<V>>;
  label?: string;
  size?: "sm" | "md";
}

const sizeClasses = {
  sm: "text-small h-9",
  md: "text-base h-11",
};

export function SegmentedControl<V extends string>({
  value,
  onChange,
  options,
  label,
  size = "md",
}: SegmentedControlProps<V>) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn(
        "inline-flex w-full rounded-full bg-surface-2 p-1 border border-rule",
        sizeClasses[size],
      )}
    >
      {options.map((opt) => {
        const selected = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(opt.value)}
            className={cn(
              "flex-1 inline-flex items-center justify-center gap-1.5 rounded-full font-medium transition-colors duration-fast",
              "focus-visible:outline-none focus-visible:shadow-focus",
              selected
                ? "bg-surface text-ink shadow-sm"
                : "text-ink-2 hover:text-ink",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
