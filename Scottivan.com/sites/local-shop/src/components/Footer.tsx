import Link from "next/link";
import { Instagram } from "lucide-react";
import { Logotype } from "@/components/Logotype";

const FOOTER_NAV = [
  {
    heading: "Shop",
    links: [
      { href: "/shop?cat=produce", label: "Produce" },
      { href: "/shop?cat=prepared", label: "Prepared foods" },
      { href: "/shop?cat=bread", label: "Bread" },
      { href: "/shop?cat=pantry", label: "Pantry" },
      { href: "/shop?cat=sweets", label: "Sweets" },
    ],
  },
  {
    heading: "The shop",
    links: [
      { href: "/visit", label: "Visit" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/orders/lookup", label: "Order lookup" },
    ],
  },
  {
    heading: "Fine print",
    links: [
      { href: "/policies#shipping", label: "Shipping" },
      { href: "/policies#returns", label: "Returns" },
      { href: "/policies#allergens", label: "Allergens" },
      { href: "/policies#privacy", label: "Privacy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-rule bg-surface-2">
      <div className="container-page py-section-tight md:py-section">
        {/* Top row: brand + nav columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          <div className="md:col-span-4">
            <Logotype size="md" />
            <p className="mt-4 text-small text-ink-2 max-w-xs leading-relaxed">
              A neighborhood pantry. Field-fresh and shelf-considered. Open
              seven days, with restocks every Friday.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Link
                href="https://instagram.com"
                aria-label="Field & Larder on Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-rule text-ink-2 hover:text-accent hover:border-rule-strong transition-colors duration-fast"
              >
                <Instagram className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>

          <nav
            aria-label="Footer"
            className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8"
          >
            {FOOTER_NAV.map((group) => (
              <div key={group.heading}>
                <h2 className="eyebrow mb-4">{group.heading}</h2>
                <ul className="flex flex-col gap-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-small text-ink-2 hover:text-ink transition-colors duration-fast"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom row: hours, address, fine print */}
        <div className="mt-section-tight pt-6 border-t border-rule grid grid-cols-1 md:grid-cols-3 gap-6 text-mono-tag font-mono text-ink-2">
          <div>
            <p className="eyebrow font-sans mb-2">Hours</p>
            <p>Mon–Sat · 8a – 7p</p>
            <p>Sun · 9a – 4p</p>
          </div>
          <div>
            <p className="eyebrow font-sans mb-2">Visit</p>
            <p>248 Greene St</p>
            <p>Hudson, NY 12534</p>
          </div>
          <div className="md:text-right">
            <p>© {new Date().getFullYear()} Field &amp; Larder</p>
            <p className="mt-2">
              <Link
                href="https://scottivan.com/models"
                className="hover:text-accent transition-colors duration-fast"
              >
                A model by Scott Ivan ↗
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
