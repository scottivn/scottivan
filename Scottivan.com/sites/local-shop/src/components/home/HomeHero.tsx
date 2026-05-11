import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProductImage } from "@/components/ProductImage";

export function HomeHero() {
  return (
    <section className="container-page py-section">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-7 order-2 lg:order-1">
          <p className="eyebrow mb-6">A neighborhood pantry · Hudson, NY</p>
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
        </div>

        <div className="lg:col-span-5 order-1 lg:order-2">
          <ProductImage
            hue={[28, 50]}
            ratio="portrait"
            alt="Field & Larder storefront — placeholder photography"
            caption="/* hero photography — placeholder */"
            className="shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
