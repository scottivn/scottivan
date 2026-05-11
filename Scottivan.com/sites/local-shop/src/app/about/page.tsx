import type { Metadata } from "next";
import Link from "next/link";
import { ProductImage } from "@/components/ProductImage";

export const metadata: Metadata = {
  title: "About",
  description:
    "A small specialty grocer in Hudson, NY — built around the table we want to sit at.",
};

const GROWERS = [
  {
    name: "Mead Orchards",
    place: "Tivoli, NY",
    note: "Stone fruit, apples, and pears. Sixth-generation orchard.",
    hue: [25, 45] as [number, number],
  },
  {
    name: "Phillies Bridge Farm",
    place: "New Paltz, NY",
    note: "Mixed organic produce. CSA-style, certified humane.",
    hue: [90, 130] as [number, number],
  },
  {
    name: "Wrong Direction Farm",
    place: "Westmoreland, NY",
    note: "Pasture-raised chicken and eggs. Daily-moved coops.",
    hue: [40, 60] as [number, number],
  },
  {
    name: "Old Chatham Creamery",
    place: "Old Chatham, NY",
    note: "Sheep's-milk yogurt, ricotta, feta. Local since 1991.",
    hue: [45, 70] as [number, number],
  },
  {
    name: "Catskill Provisions",
    place: "Long Eddy, NY",
    note: "Wildflower and buckwheat honey, plus rye whiskey we don't carry.",
    hue: [35, 50] as [number, number],
  },
  {
    name: "Burnt Rock Farm",
    place: "Huntington, VT",
    note: "Maple syrup, all four grades, tapped within ten miles of the bottling line.",
    hue: [25, 45] as [number, number],
  },
];

export default function AboutPage() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="container-page py-section">
        <p className="eyebrow mb-4">Our story</p>
        <h1 className="font-display text-display-1 text-ink tracking-tight mb-8 max-w-4xl">
          Built around the table we want to sit at.
        </h1>
        <div className="max-w-prose space-y-5 text-md md:text-h3 text-ink-2 leading-relaxed">
          <p>
            Field &amp; Larder opened on a quiet stretch of Greene Street in the
            spring of 2023. We&apos;d been talking about it for years — the
            shop we kept hoping someone else would build.
          </p>
          <p>
            Two convictions guide what&apos;s on the shelves. First, that small
            farms within an hour&apos;s drive grow some of the best food in the
            country. Second, that a thoughtful pantry can stretch a Tuesday
            into something worth eating.
          </p>
          <p>
            The shop is small on purpose. We carry one or two of a thing rather
            than ten of it. We name our growers. We bake in the back. We
            restock on Friday and run out by the weekend, more often than not.
          </p>
        </div>
      </section>

      {/* Growers grid */}
      <section className="border-t border-rule bg-surface-2/40">
        <div className="container-page py-section">
          <p className="eyebrow mb-3">Growers &amp; makers</p>
          <h2 className="font-display text-h1 text-ink tracking-tight mb-3">
            The names on the shelf.
          </h2>
          <p className="text-md text-ink-2 max-w-2xl leading-relaxed mb-10">
            A handful of farms and producers do most of the heavy lifting in the
            shop. We visit. We pay on time. We try to get out of the way.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {GROWERS.map((g) => (
              <article
                key={g.name}
                className="bg-surface rounded-lg border border-rule overflow-hidden shadow-xs hover:shadow-md transition-shadow duration-normal"
              >
                <ProductImage
                  hue={g.hue}
                  ratio="landscape"
                  alt={`${g.name} — placeholder photography`}
                  className="rounded-none border-none"
                />
                <div className="p-5">
                  <h3 className="font-display text-h3 text-ink">{g.name}</h3>
                  <p className="font-mono text-mono-tag text-ink-2 mt-1">
                    {g.place}
                  </p>
                  <p className="mt-3 text-small text-ink-2 leading-relaxed">
                    {g.note}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="border-t border-rule">
        <div className="container-page py-section">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-5">
              <ProductImage
                hue={[30, 50]}
                ratio="portrait"
                alt="A few of us at the counter — placeholder photography"
                caption="/* team photo — placeholder */"
                className="shadow-md"
              />
            </div>
            <div className="lg:col-span-7">
              <p className="eyebrow mb-3">Behind the counter</p>
              <h2 className="font-display text-h1 text-ink tracking-tight mb-6">
                Six of us, plus the dog.
              </h2>
              <p className="text-md text-ink-2 leading-relaxed max-w-2xl mb-5">
                The shop runs on a small crew — bakers in early, counter folks
                through the day, a kitchen team prepping for the case. We bake
                our own bread, brew the coffee, and answer questions when we
                can.
              </p>
              <p className="text-md text-ink-2 leading-relaxed max-w-2xl">
                Want to work with us? We hire occasionally, mostly through{" "}
                <Link
                  href="/contact"
                  className="text-accent hover:text-accent-hover transition-colors duration-fast underline underline-offset-2"
                >
                  word of mouth and the contact form
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
