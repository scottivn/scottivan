import Link from "next/link";
import { ProductImage } from "@/components/ProductImage";

export function StoryBlock() {
  return (
    <section className="border-t border-rule">
      <div className="container-page py-section">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <ProductImage
              hue={[35, 55]}
              ratio="square"
              alt="Inside Field & Larder — placeholder photography"
              caption="/* photography placeholder */"
              className="shadow-md"
            />
          </div>
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5">Our story</p>
            <h2 className="font-display text-h1 text-ink tracking-tight mb-6">
              Built around the table we want to sit at.
            </h2>
            <div className="space-y-5 text-md text-ink-2 leading-relaxed max-w-2xl">
              <p>
                We opened in 2023 with two convictions: that small farms within
                an hour&apos;s drive grow some of the best food in the country,
                and that a good pantry can stretch a Tuesday into something
                worth eating.
              </p>
              <p>
                The shop is small on purpose. We carry one or two of a thing
                rather than ten of it. We name our growers. We bake in the
                back. We restock on Friday and run out by the weekend, more
                often than not.
              </p>
            </div>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-1.5 text-base font-medium text-accent hover:text-accent-hover transition-colors duration-fast"
            >
              Read more about who we are →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
