"use client";

import { useMemo, useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { PRODUCTS, stockStatus } from "@/data/products";
import { CATEGORIES, getCategory } from "@/data/categories";
import { ProductCard } from "@/components/ProductCard";
import { CategoryNav } from "@/components/shop/CategoryNav";
import { FilterBar, type Filters } from "@/components/shop/FilterBar";
import { SortMenu, type SortKey } from "@/components/shop/SortMenu";
import { SearchInput } from "@/components/shop/SearchInput";
import { Button } from "@/components/ui/Button";
import type { DietaryTag } from "@/lib/types";

const VALID_CATEGORY_SLUGS = new Set(CATEGORIES.map((c) => c.slug));
const VALID_DIETARY: DietaryTag[] = [
  "vegan",
  "vegetarian",
  "gluten-free",
  "dairy-free",
  "nut-free",
  "organic",
];

function parseSort(raw: string | null): SortKey {
  switch (raw) {
    case "price-asc":
    case "price-desc":
    case "name":
    case "newest":
      return raw;
    default:
      return "newest";
  }
}

function parseDietary(raw: string | null): DietaryTag[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter((s): s is DietaryTag =>
      (VALID_DIETARY as string[]).includes(s),
    );
}

function ShopCatalogInner() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  // URL state
  const rawCat = params.get("cat");
  const selectedCategory =
    rawCat && VALID_CATEGORY_SLUGS.has(rawCat as never) ? rawCat : null;
  const initialQuery = params.get("q") ?? "";
  const initialSort = parseSort(params.get("sort"));
  const initialDietary = parseDietary(params.get("dietary"));
  const initialInStock = params.get("instock") === "1";
  const initialPickup = params.get("pickup") === "1";

  // Local state mirroring URL
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState<SortKey>(initialSort);
  const [filters, setFilters] = useState<Filters>({
    dietary: initialDietary,
    inStockOnly: initialInStock,
    pickupEligible: initialPickup,
  });

  // Persist filter state back to URL (so back button works + share-able)
  useEffect(() => {
    const next = new URLSearchParams();
    if (selectedCategory) next.set("cat", selectedCategory);
    if (query) next.set("q", query);
    if (sort !== "newest") next.set("sort", sort);
    if (filters.dietary.length) next.set("dietary", filters.dietary.join(","));
    if (filters.inStockOnly) next.set("instock", "1");
    if (filters.pickupEligible) next.set("pickup", "1");
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, sort, filters]);

  const filtered = useMemo(() => {
    let result = PRODUCTS.slice();

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.sourcingNotes?.toLowerCase().includes(q) ?? false),
      );
    }
    if (filters.dietary.length) {
      result = result.filter((p) =>
        filters.dietary.every((tag) => p.dietaryTags.includes(tag)),
      );
    }
    if (filters.inStockOnly) {
      result = result.filter((p) => stockStatus(p) !== "out");
    }
    if (filters.pickupEligible) {
      result = result.filter((p) => p.fulfillment !== "ship-only");
    }

    // sort
    switch (sort) {
      case "price-asc":
        result = result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = result.sort((a, b) => b.price - a.price);
        break;
      case "name":
        result = result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "newest":
      default:
        result = result.sort((a, b) =>
          b.createdAt.localeCompare(a.createdAt),
        );
    }

    return result;
  }, [selectedCategory, query, filters, sort]);

  const category = selectedCategory ? getCategory(selectedCategory) : null;

  return (
    <div className="container-page py-section-tight">
      {/* Header row */}
      <div className="mb-8 md:mb-10">
        <p className="eyebrow mb-3">
          {category ? `Shop · ${category.side === "field" ? "Field" : "Larder"}` : "Shop everything"}
        </p>
        <h1 className="font-display text-h1 text-ink tracking-tight">
          {category ? category.name : "Everything in the shop"}
        </h1>
        {category ? (
          <p className="mt-3 text-md text-ink-2 max-w-2xl leading-relaxed">
            {category.blurb}
          </p>
        ) : (
          <p className="mt-3 text-md text-ink-2 max-w-2xl leading-relaxed">
            From the field and on the shelf. Restocks every Friday. Pickup is
            free; shipping is flat-rate.
          </p>
        )}
      </div>

      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Sidebar */}
        <aside className="lg:col-span-3">
          <div className="lg:sticky lg:top-24 space-y-8">
            <CategoryNav selected={selectedCategory} />
          </div>
        </aside>

        {/* Main */}
        <div className="lg:col-span-9 min-w-0">
          {/* Controls */}
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <SearchInput
                value={query}
                onChange={setQuery}
                placeholder="Search 40 items"
                className="sm:max-w-sm flex-1"
              />
              <div className="sm:ml-auto">
                <SortMenu value={sort} onChange={setSort} />
              </div>
            </div>
            <FilterBar filters={filters} onChange={setFilters} />
          </div>

          {/* Results count + sort summary */}
          <div className="flex items-baseline justify-between gap-3 mb-5 pb-4 border-b border-rule">
            <p className="font-mono text-mono-tag text-ink-2">
              {filtered.length}{" "}
              {filtered.length === 1 ? "result" : "results"}
              {query ? (
                <>
                  {" "}
                  for <span className="text-ink">&quot;{query}&quot;</span>
                </>
              ) : null}
            </p>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="rounded-lg border border-rule bg-surface px-6 py-16 text-center">
              <p className="font-display text-h3 text-ink mb-2">
                Nothing matches.
              </p>
              <p className="text-small text-ink-2 max-w-md mx-auto mb-6">
                Try clearing a filter, or search a different term. Our pantry
                deepens with the season — what&apos;s missing now might be in
                next week.
              </p>
              <Button
                variant="secondary"
                size="md"
                onClick={() => {
                  setQuery("");
                  setFilters({
                    dietary: [],
                    inStockOnly: false,
                    pickupEligible: false,
                  });
                }}
              >
                Clear search and filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} showCategory={!category} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function ShopCatalog() {
  // useSearchParams must be wrapped in Suspense for static export
  return (
    <Suspense
      fallback={
        <div className="container-page py-section-tight">
          <p className="eyebrow">Loading the shop…</p>
        </div>
      }
    >
      <ShopCatalogInner />
    </Suspense>
  );
}
