import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex-1 flex flex-col">
      {/* Hero */}
      <section className="container-page py-section">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <p className="eyebrow mb-6">A neighborhood pantry</p>
            <h1 className="display-1 text-ink mb-6">
              Field-fresh <span className="text-accent">&amp;</span>{" "}
              shelf-considered.
            </h1>
            <p className="text-md md:text-h3 text-ink-2 max-w-xl leading-relaxed mb-10">
              A specialty grocer just off Warren Street. Restocks every Friday.
              Bread on the counter by 7am. Pantry deepens with the season.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/shop">
                <Button size="lg" className="px-7">
                  Shop the Larder
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Button>
              </Link>
              <Link href="/visit">
                <Button size="lg" variant="secondary">
                  Visit us
                </Button>
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Badge tone="warn">Build in progress</Badge>
              <span className="text-small text-ink-3">
                The full storefront ships in phases — see the master plan for status.
              </span>
            </div>
          </div>

          {/* Hero image placeholder — Phase 2 replaces with real photography */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-surface-2 border border-rule">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(120% 80% at 30% 20%, var(--color-accent-soft) 0%, transparent 50%), radial-gradient(80% 60% at 80% 80%, rgba(92,122,79,0.18) 0%, transparent 60%), var(--color-bg-tertiary)",
                }}
              />
              <div className="absolute inset-0 flex items-end p-6">
                <div className="font-mono text-mono-tag text-ink-2">
                  /* hero photography — Phase 2 */
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Token system check — temporary, removed once Phase 2 modules render real content */}
      <section className="container-page py-section-tight border-t border-rule">
        <p className="eyebrow mb-6">Design system check</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {[
            { name: "bg", className: "bg-bg" },
            { name: "surface", className: "bg-surface" },
            { name: "surface-2", className: "bg-surface-2" },
            { name: "ink", className: "bg-ink" },
            { name: "accent", className: "bg-accent" },
            { name: "success", className: "bg-success" },
            { name: "warn", className: "bg-warn" },
            { name: "danger", className: "bg-danger" },
          ].map((swatch) => (
            <div key={swatch.name} className="flex flex-col gap-2">
              <div
                className={`${swatch.className} aspect-square rounded-md border border-rule`}
              />
              <span className="font-mono text-mono-tag text-ink-2">
                {swatch.name}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
