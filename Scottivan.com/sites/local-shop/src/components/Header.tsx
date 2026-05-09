"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { Logotype } from "@/components/Logotype";
import { IconButton } from "@/components/ui/IconButton";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { cn } from "@/lib/cn";

const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/visit", label: "Visit" },
  { href: "/about", label: "About" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile drawer on route change / Escape
  useEffect(() => {
    if (!mobileOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-sticky border-b border-rule transition-[background-color,backdrop-filter] duration-fast",
        scrolled
          ? "bg-bg/80 backdrop-blur-md"
          : "bg-bg",
      )}
    >
      <div className="container-page flex h-16 md:h-20 items-center justify-between gap-4">
        {/* Left: logotype */}
        <div className="flex items-center gap-3">
          <IconButton
            label="Open menu"
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" aria-hidden />
          </IconButton>
          <Logotype size="md" />
        </div>

        {/* Center: desktop nav */}
        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-8"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-small font-medium text-ink-2 hover:text-ink transition-colors duration-fast"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: actions */}
        <div className="flex items-center gap-1 md:gap-2">
          <IconButton label="Search" className="text-ink-2 hover:text-accent">
            <Search className="h-5 w-5" aria-hidden />
          </IconButton>
          <DarkModeToggle />
          <Link
            href="/cart"
            aria-label="Cart"
            className={cn(
              "relative inline-flex h-11 w-11 items-center justify-center rounded-full",
              "text-ink-2 hover:text-accent hover:bg-accent-soft transition-colors duration-fast",
              "focus-visible:outline-none focus-visible:shadow-focus",
            )}
          >
            <ShoppingBag className="h-5 w-5" aria-hidden />
            {/* Badge slot — wired to cart store in Phase 2 */}
          </Link>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
          className="fixed inset-0 z-modal md:hidden"
        >
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-overlay"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-[min(85vw,360px)] bg-bg border-r border-rule shadow-xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-rule">
              <Logotype size="sm" />
              <IconButton
                label="Close menu"
                onClick={() => setMobileOpen(false)}
              >
                <X className="h-5 w-5" aria-hidden />
              </IconButton>
            </div>
            <nav
              aria-label="Mobile primary"
              className="flex-1 p-6 flex flex-col gap-4"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-display text-h2 text-ink hover:text-accent transition-colors duration-fast"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
