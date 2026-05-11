import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Policies",
  description:
    "Shipping, returns, allergens, and privacy at Field & Larder.",
};

const SECTIONS = [
  {
    id: "shipping",
    title: "Shipping",
    body: [
      "We ship most pantry, sweets, and coffee items within the continental US via ground service. Orders placed by 2pm ET ship the same business day; orders after 2pm or on weekends ship the next business day.",
      "Flat-rate shipping is $12 per order. We don't pad invoices with handling fees. Transit is typically two to four business days.",
      "Perishable items — produce, prepared foods, bread, dairy, and eggs — are pickup-only. The cart will tell you when an item requires pickup; mixed carts default to in-store pickup.",
    ],
  },
  {
    id: "pickup",
    title: "In-store pickup",
    body: [
      "Pickup orders are usually ready within two hours during open hours. We'll email when your order is ready.",
      "Pickups are held for seven days. After that, perishables are donated and shelf-stable items are restocked; we'll refund anything we can't hold.",
    ],
  },
  {
    id: "returns",
    title: "Returns",
    body: [
      "If anything arrives damaged or isn't right, email or call within 14 days and we'll make it right — refund or replacement, your choice.",
      "Shelf-stable items can be returned within 30 days for store credit. Perishable items can't be returned for food-safety reasons, but again, if something's off, tell us.",
    ],
  },
  {
    id: "allergens",
    title: "Allergens",
    body: [
      "Every product page lists known allergens. Our kitchen is not allergen-free — we work with wheat, dairy, eggs, tree nuts, and sesame. If you have a serious allergy, ask. We'll be honest about cross-contact risk.",
      "Allergen labels reflect the product as it ships. Allergens can vary by batch; check the package when you receive your order.",
    ],
  },
  {
    id: "privacy",
    title: "Privacy",
    body: [
      "We only collect what's needed to process your order: name, contact info, shipping address, and payment details. Payments are handled by Stripe — we never see your card number.",
      "We don't sell or share your information. We do send the occasional newsletter, only if you opt in.",
      "You can request your data, or its deletion, by emailing the shop. We'll respond within a week.",
    ],
  },
];

export default function PoliciesPage() {
  return (
    <main className="flex-1">
      <div className="container-page py-section-tight">
        <p className="eyebrow mb-4">Fine print</p>
        <h1 className="font-display text-display-2 text-ink tracking-tight mb-6">
          Policies.
        </h1>
        <p className="text-md text-ink-2 max-w-2xl leading-relaxed mb-section-tight">
          The short version: we try to be fair. If anything below feels off, email
          and we&apos;ll work it out.
        </p>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Section nav */}
          <nav
            aria-label="Policies"
            className="lg:col-span-3 lg:sticky lg:top-24 lg:self-start"
          >
            <p className="eyebrow mb-3">On this page</p>
            <ul className="space-y-2 font-mono text-mono-tag">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-ink-2 hover:text-accent transition-colors duration-fast"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sections */}
          <article className="lg:col-span-9 space-y-12 max-w-prose">
            {SECTIONS.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <h2 className="font-display text-h1 text-ink tracking-tight mb-5">
                  {s.title}
                </h2>
                <div className="space-y-4 text-md text-ink-2 leading-relaxed">
                  {s.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </article>
        </div>
      </div>
    </main>
  );
}
