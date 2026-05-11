import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Car, Accessibility, Train, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProductImage } from "@/components/ProductImage";

export const metadata: Metadata = {
  title: "Visit",
  description:
    "Find Field & Larder at 248 Greene St in Hudson, NY. Hours, parking, transit, and accessibility.",
};

const HOURS = [
  { day: "Monday", range: "8a – 7p" },
  { day: "Tuesday", range: "8a – 7p" },
  { day: "Wednesday", range: "8a – 7p" },
  { day: "Thursday", range: "8a – 7p" },
  { day: "Friday", range: "8a – 7p" },
  { day: "Saturday", range: "8a – 7p" },
  { day: "Sunday", range: "9a – 4p" },
];

const HOLIDAYS = [
  "New Year's Day",
  "Memorial Day",
  "Independence Day",
  "Thanksgiving",
  "Dec 24 (close at 3p) & 25",
];

const DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=248+Greene+St+Hudson+NY+12534";

export default function VisitPage() {
  return (
    <main className="flex-1">
      <div className="container-page py-section-tight">
        <p className="eyebrow mb-4">Visit</p>
        <h1 className="font-display text-display-1 text-ink tracking-tight mb-6">
          248 Greene St, Hudson NY.
        </h1>
        <p className="text-md md:text-h3 text-ink-2 max-w-2xl leading-relaxed">
          Half a block off Warren. Mailing list signup is in the front window;
          new bake is on the right; everything else takes a minute.
        </p>

        <div className="mt-section grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Map placeholder + address */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] rounded-lg overflow-hidden border border-rule">
              <ProductImage
                hue={[120, 80]}
                ratio="landscape"
                alt="Map placeholder for 248 Greene St, Hudson NY"
                className="absolute inset-0"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-surface rounded-full shadow-lg p-4 flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent text-on-accent">
                    <MapPin className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="font-display text-md text-ink leading-tight">
                      Field &amp; Larder
                    </p>
                    <p className="font-mono text-mono-tag text-ink-2 leading-tight">
                      248 Greene St
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex"
              >
                <Button size="md">
                  Get directions
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </Button>
              </Link>
              <Link
                href="tel:+15185550148"
                className="text-base font-medium text-ink-2 hover:text-accent transition-colors duration-fast"
              >
                (518) 555-0148
              </Link>
            </div>
          </div>

          {/* Hours */}
          <div className="lg:col-span-5">
            <p className="eyebrow mb-3">Hours</p>
            <h2 className="font-display text-h2 text-ink tracking-tight mb-5">
              Open seven days.
            </h2>
            <table className="w-full font-mono text-mono-tag">
              <tbody>
                {HOURS.map((h) => (
                  <tr key={h.day} className="border-b border-rule last:border-b-0">
                    <th
                      scope="row"
                      className="text-left py-2.5 font-normal text-ink"
                    >
                      {h.day}
                    </th>
                    <td className="text-right py-2.5 text-ink-2">{h.range}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-6">
              <p className="eyebrow mb-2">Closed</p>
              <ul className="space-y-1.5 font-mono text-mono-tag text-ink-2">
                {HOLIDAYS.map((h) => (
                  <li key={h}>· {h}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Getting here */}
        <section className="mt-section pt-12 border-t border-rule">
          <p className="eyebrow mb-3">Getting here</p>
          <h2 className="font-display text-h1 text-ink tracking-tight mb-10">
            By car, train, or sidewalk.
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            <div>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent mb-4">
                <Car className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="font-display text-h3 text-ink mb-2">Parking</h3>
              <p className="text-small text-ink-2 leading-relaxed">
                Two-hour street parking on Greene and Warren. Free municipal lot
                on Columbia Street, two blocks south.
              </p>
            </div>
            <div>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent mb-4">
                <Train className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="font-display text-h3 text-ink mb-2">Train</h3>
              <p className="text-small text-ink-2 leading-relaxed">
                Hudson Amtrak station is a ten-minute walk. Frequent service from
                Penn Station and Albany.
              </p>
            </div>
            <div>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent mb-4">
                <Accessibility className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="font-display text-h3 text-ink mb-2">Accessibility</h3>
              <p className="text-small text-ink-2 leading-relaxed">
                Step-free entrance, wide aisles, accessible restroom. Service
                animals always welcome.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
