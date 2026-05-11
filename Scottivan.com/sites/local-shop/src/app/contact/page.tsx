import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach out to Field & Larder — wholesale, catering, press, or just a question.",
};

export default function ContactPage() {
  return (
    <main className="flex-1">
      <div className="container-page py-section">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-4">Contact</p>
            <h1 className="font-display text-display-2 text-ink tracking-tight mb-6">
              Say hello.
            </h1>
            <p className="text-md text-ink-2 max-w-md leading-relaxed mb-10">
              For wholesale, catering, press, or just a question about
              something on the shelf — fill in the form. We read every
              message.
            </p>

            <div className="space-y-6 font-mono text-mono-tag text-ink-2">
              <div>
                <p className="eyebrow font-sans mb-2">Wholesale</p>
                <p>Restaurants, hotels, and offices — case pricing on most pantry items.</p>
              </div>
              <div>
                <p className="eyebrow font-sans mb-2">Catering</p>
                <p>Pickup-only platters, breakfast boxes, and pantry gift baskets.</p>
              </div>
              <div>
                <p className="eyebrow font-sans mb-2">In person</p>
                <p>
                  248 Greene St, Hudson NY 12534
                  <br />
                  (518) 555-0148
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-lg border border-rule bg-surface-2/40 p-6 md:p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
