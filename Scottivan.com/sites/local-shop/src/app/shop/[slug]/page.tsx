import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  PRODUCTS,
  getProductBySlug,
  formatPrice,
  stockStatus,
} from "@/data/products";
import { getCategory } from "@/data/categories";
import { ProductImage } from "@/components/ProductImage";
import { ProductCard } from "@/components/ProductCard";
import { StockBadge } from "@/components/ui/StockBadge";
import { Badge } from "@/components/ui/Badge";
import { AddToCartControls } from "@/components/shop/AddToCartControls";

interface PageProps {
  params: { slug: string };
}

// Static generation for every product slug at build time
export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Not found" };
  return {
    title: product.name,
    description: product.description,
  };
}

const ALLERGEN_LABELS: Record<string, string> = {
  gluten: "Contains gluten",
  dairy: "Contains dairy",
  eggs: "Contains eggs",
  "tree-nuts": "Contains tree nuts",
  peanuts: "Contains peanuts",
  soy: "Contains soy",
  sesame: "Contains sesame",
};

const DIETARY_LABELS: Record<string, string> = {
  vegan: "Vegan",
  vegetarian: "Vegetarian",
  "gluten-free": "Gluten-free",
  "dairy-free": "Dairy-free",
  "nut-free": "Nut-free",
  organic: "Organic",
};

const FULFILLMENT_LABELS = {
  "pickup-only": "In-store pickup only",
  "ship-only": "Ship only",
  both: "In-store pickup or shipping",
};

export default function ProductDetailPage({ params }: PageProps) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const status = stockStatus(product);

  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id,
  ).slice(0, 3);

  const eyebrow = product.todayOnly
    ? { text: "Today only", tone: "danger" as const }
    : product.newThisWeek
      ? { text: "New this week", tone: "accent" as const }
      : product.featured
        ? { text: "Featured", tone: "neutral" as const }
        : null;

  return (
    <main className="flex-1">
      <div className="container-page py-section-tight">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="font-mono text-mono-tag text-ink-2 mb-8 flex items-center gap-2"
        >
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 hover:text-accent transition-colors duration-fast"
          >
            <ArrowLeft className="h-3 w-3" aria-hidden />
            Shop
          </Link>
          {category ? (
            <>
              <span aria-hidden>·</span>
              <Link
                href={`/shop?cat=${category.slug}`}
                className="hover:text-accent transition-colors duration-fast"
              >
                {category.name}
              </Link>
            </>
          ) : null}
        </nav>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Gallery */}
          <div className="lg:col-span-7">
            <ProductImage
              hue={product.hue}
              alt={`${product.name} — placeholder photography`}
              ratio="portrait"
              className="shadow-md"
              caption={product.unit}
            />
            {/* Phase 7 polish replaces this single-image gallery with a thumb strip */}
          </div>

          {/* Info */}
          <div className="lg:col-span-5">
            {eyebrow ? (
              <div className="mb-4">
                <Badge tone={eyebrow.tone}>{eyebrow.text}</Badge>
              </div>
            ) : null}

            <h1 className="font-display text-display-2 text-ink tracking-tight">
              {product.name}
            </h1>

            <div className="mt-3 flex items-baseline gap-3">
              <span className="font-mono text-h3 text-ink tabular-nums">
                {formatPrice(product.price)}
              </span>
              <span className="font-mono text-mono-tag text-ink-2">
                {product.unit}
              </span>
            </div>

            <div className="mt-5">
              <StockBadge product={product} showCount />
            </div>

            <p className="mt-6 text-md text-ink-2 leading-relaxed">
              {product.description}
            </p>

            {product.sourcingNotes ? (
              <div className="mt-6 rounded-lg border border-rule bg-surface-2/50 px-4 py-3">
                <p className="eyebrow mb-1">Sourcing</p>
                <p className="text-small text-ink-2">{product.sourcingNotes}</p>
              </div>
            ) : null}

            {/* Tags row */}
            {(product.dietaryTags.length > 0 || product.allergens.length > 0) ? (
              <div className="mt-6 flex flex-wrap items-center gap-2">
                {product.dietaryTags.map((tag) => (
                  <Badge key={tag} tone="success">
                    {DIETARY_LABELS[tag] ?? tag}
                  </Badge>
                ))}
                {product.allergens.map((al) => (
                  <Badge key={al} tone="warn">
                    {ALLERGEN_LABELS[al] ?? al}
                  </Badge>
                ))}
              </div>
            ) : null}

            {/* Fulfillment notice */}
            <p className="mt-6 font-mono text-mono-tag text-ink-2">
              · {FULFILLMENT_LABELS[product.fulfillment]}
            </p>

            <div className="mt-8 pt-6 border-t border-rule">
              {status === "out" ? (
                <div className="rounded-lg border border-rule bg-surface-2 px-4 py-3 text-small text-ink-2">
                  Sold out for now. Check back Friday — we restock weekly.
                </div>
              ) : (
                <AddToCartControls product={product} />
              )}
            </div>
          </div>
        </div>

        {/* You might also like */}
        {related.length > 0 ? (
          <section className="mt-section pt-12 border-t border-rule">
            <p className="eyebrow mb-3">From the same shelf</p>
            <h2 className="font-display text-h1 text-ink tracking-tight mb-8">
              You might also like
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 md:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
