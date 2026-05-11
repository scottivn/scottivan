"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/cn";

interface QtyStepperProps {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
  label?: string;
}

const sizeClasses = {
  sm: "h-8 text-small",
  md: "h-10 text-base",
};

const buttonSizeClasses = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
};

export function QtyStepper({
  value,
  onChange,
  min = 0,
  max = 99,
  size = "md",
  label = "Quantity",
}: QtyStepperProps) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));

  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "inline-flex items-center rounded-full border border-rule bg-surface",
        sizeClasses[size],
      )}
    >
      <button
        type="button"
        onClick={dec}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className={cn(
          "inline-flex items-center justify-center rounded-l-full text-ink hover:text-accent disabled:text-ink-3 disabled:cursor-not-allowed transition-colors duration-fast",
          buttonSizeClasses[size],
          "focus-visible:outline-none focus-visible:shadow-focus",
        )}
      >
        <Minus className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"} aria-hidden />
      </button>
      <span
        aria-live="polite"
        className={cn(
          "min-w-[2ch] text-center font-mono tracking-tight tabular-nums select-none",
          size === "sm" ? "px-1.5" : "px-2",
        )}
      >
        {value}
      </span>
      <button
        type="button"
        onClick={inc}
        disabled={value >= max}
        aria-label="Increase quantity"
        className={cn(
          "inline-flex items-center justify-center rounded-r-full text-ink hover:text-accent disabled:text-ink-3 disabled:cursor-not-allowed transition-colors duration-fast",
          buttonSizeClasses[size],
          "focus-visible:outline-none focus-visible:shadow-focus",
        )}
      >
        <Plus className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"} aria-hidden />
      </button>
    </div>
  );
}
