import Link from "next/link";
import {
  FIELD_CATEGORIES,
  LARDER_CATEGORIES,
} from "@/data/categories";
import type { Category } from "@/lib/types";
import { ProductImage } from "@/components/ProductImage";

function CategoryTile({ category }: { category: Category }) {
  return (
    <Link
      href={`/shop?cat=${category.slug}`}
      className="group block rounded-md focus-visible:outline-none focus-visible:shadow-focus"
    >
      <ProductImage
        hue={category.hue}
        alt={`${category.name} category — placeholder photography`}
        ratio="landscape"
        className="transition-transform duration-normal will-change-transform group-hover:scale-[1.015] group-focus-visible:scale-[1.015]"
      />
      <div className="mt-3 flex items-baseline justify-between gap-3">
        <h3 className="font-display text-h3 text-ink group-hover:text-accent group-focus-visible:text-accent transition-colors duration-fast">
          {category.name}
        </h3>
        <span
          aria-hidden
          className="font-mono text-mono-tag text-ink-2 group-hover:text-accent group-focus-visible:text-accent transition-colors duration-fast"
        >
          →
        </span>
      </div>
      <p className="mt-1 text-small text-ink-2 leading-relaxed">
        {category.blurb}
      </p>
    </Link>
  );
}

export function CategoriesGrid() {
  return (
    <section className="border-t border-rule bg-surface-2/40">
      <div className="container-page py-section">
        {/* Field */}
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <p className="eyebrow mb-2">Field</p>
            <h2 className="font-display text-h2 text-ink tracking-tight">
              Perishable, picked or pulled this week.
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {FIELD_CATEGORIES.map((c) => (
            <CategoryTile key={c.slug} category={c} />
          ))}
        </div>

        {/* Larder */}
        <div className="flex items-end justify-between gap-6 mb-8 mt-section-tight">
          <div>
            <p className="eyebrow mb-2">Larder</p>
            <h2 className="font-display text-h2 text-ink tracking-tight">
              Pantry depth, restocked monthly.
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {LARDER_CATEGORIES.map((c) => (
            <CategoryTile key={c.slug} category={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
