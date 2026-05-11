import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { getThisWeekProducts, getFeaturedProducts } from "@/data/products";

export function ThisWeekModule() {
  // Show all "this week" items, top up with featured to get a generous row
  const thisWeek = getThisWeekProducts();
  const featured = getFeaturedProducts().filter(
    (p) => !thisWeek.find((q) => q.id === p.id),
  );
  const items = [...thisWeek, ...featured].slice(0, 8);

  return (
    <section className="border-t border-rule">
      <div className="container-page py-section">
        <div className="flex items-end justify-between gap-6 mb-8 md:mb-10">
          <div>
            <p className="eyebrow mb-3">This week</p>
            <h2 className="font-display text-h1 text-ink tracking-tight">
              Out of the oven, off the field.
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden md:inline-flex items-center gap-1.5 text-small font-medium text-ink-2 hover:text-accent transition-colors duration-fast shrink-0 pb-2"
          >
            See everything in stock
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>

        {/* Scroll-snap on mobile, grid on desktop */}
        <div className="-mx-gutter px-gutter md:mx-0 md:px-0">
          <div className="flex md:grid md:grid-cols-4 gap-5 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none scroll-px-4 pb-4 md:pb-0">
            {items.map((product) => (
              <div
                key={product.id}
                className="snap-start shrink-0 w-[70vw] sm:w-[42vw] md:w-auto"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 md:hidden">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-small font-medium text-ink-2 hover:text-accent transition-colors duration-fast"
          >
            See everything in stock
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
