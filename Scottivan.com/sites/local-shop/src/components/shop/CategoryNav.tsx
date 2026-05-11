"use client";

import Link from "next/link";
import {
  CATEGORIES,
  FIELD_CATEGORIES,
  LARDER_CATEGORIES,
} from "@/data/categories";
import { cn } from "@/lib/cn";
import { PRODUCTS } from "@/data/products";

interface CategoryNavProps {
  selected: string | null;
  className?: string;
}

function countForCategory(slug: string | null) {
  if (!slug) return PRODUCTS.length;
  return PRODUCTS.filter((p) => p.category === slug).length;
}

function NavItem({
  href,
  label,
  count,
  active,
}: {
  href: string;
  label: string;
  count: number;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      scroll={false}
      className={cn(
        "flex items-center justify-between gap-2 rounded-md px-3 py-2 text-small transition-colors duration-fast",
        "focus-visible:outline-none focus-visible:shadow-focus",
        active
          ? "bg-accent-soft text-accent font-medium"
          : "text-ink-2 hover:text-ink hover:bg-surface-2",
      )}
    >
      <span>{label}</span>
      <span className="font-mono text-mono-tag text-ink-3 tabular-nums">
        {count}
      </span>
    </Link>
  );
}

export function CategoryNav({ selected, className }: CategoryNavProps) {
  return (
    <nav aria-label="Categories" className={cn("flex flex-col gap-1", className)}>
      <NavItem
        href="/shop"
        label="All products"
        count={countForCategory(null)}
        active={!selected}
      />

      <p className="eyebrow mt-6 mb-2 px-3">Field</p>
      {FIELD_CATEGORIES.map((c) => (
        <NavItem
          key={c.slug}
          href={`/shop?cat=${c.slug}`}
          label={c.name}
          count={countForCategory(c.slug)}
          active={selected === c.slug}
        />
      ))}

      <p className="eyebrow mt-6 mb-2 px-3">Larder</p>
      {LARDER_CATEGORIES.map((c) => (
        <NavItem
          key={c.slug}
          href={`/shop?cat=${c.slug}`}
          label={c.name}
          count={countForCategory(c.slug)}
          active={selected === c.slug}
        />
      ))}
    </nav>
  );
}
