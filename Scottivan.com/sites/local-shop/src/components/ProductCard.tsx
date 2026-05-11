import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice, stockStatus } from "@/data/products";
import { ProductImage } from "@/components/ProductImage";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

interface ProductCardProps {
  product: Product;
  variant?: "full" | "compact";
  className?: string;
  /** Show category line above name (default in catalog views) */
  showCategory?: boolean;
}

export function ProductCard({
  product,
  variant = "full",
  className,
  showCategory = false,
}: ProductCardProps) {
  const status = stockStatus(product);
  const isSoldOut = status === "out";

  const eyebrow = product.todayOnly
    ? { text: "Today only", tone: "danger" as const }
    : product.newThisWeek
      ? { text: "New this week", tone: "accent" as const }
      : product.featured
        ? { text: "Featured", tone: "neutral" as const }
        : null;

  return (
    <Link
      href={`/shop/${product.slug}`}
      className={cn(
        "group block rounded-md focus-visible:outline-none focus-visible:shadow-focus",
        className,
      )}
    >
      <div className="relative">
        <ProductImage
          hue={product.hue}
          alt={`${product.name} — placeholder photography`}
          ratio="portrait"
          className={cn(
            "transition-transform duration-normal will-change-transform",
            "group-hover:scale-[1.015] group-focus-visible:scale-[1.015]",
            isSoldOut && "opacity-50",
          )}
          caption={variant === "full" ? product.unit : undefined}
        />
        {eyebrow ? (
          <div className="absolute top-3 left-3">
            <Badge tone={eyebrow.tone}>{eyebrow.text}</Badge>
          </div>
        ) : null}
        {isSoldOut ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Badge tone="danger">Sold out</Badge>
          </div>
        ) : null}
      </div>

      <div className="mt-4 flex flex-col gap-1">
        {showCategory ? (
          <span className="eyebrow font-sans text-ink-3">
            {product.category.replace("-", " & ")}
          </span>
        ) : null}
        <div className="flex items-baseline justify-between gap-3">
          <h3
            className={cn(
              "font-display text-h3 text-ink tracking-snug",
              "group-hover:text-accent group-focus-visible:text-accent transition-colors duration-fast",
            )}
          >
            {product.name}
          </h3>
          <span className="font-mono text-mono-tag text-ink-2 shrink-0">
            {formatPrice(product.price)}
          </span>
        </div>
        {variant === "full" ? (
          <p className="text-small text-ink-2 leading-relaxed line-clamp-2">
            {product.description}
          </p>
        ) : null}
      </div>
    </Link>
  );
}
