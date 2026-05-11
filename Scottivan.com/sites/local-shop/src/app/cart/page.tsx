"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag, ArrowRight, ArrowLeft } from "lucide-react";
import {
  useCart,
  expandLines,
  cartSubtotal,
  cartTotal,
  shippingCost,
  hasPickupOnlyItem,
} from "@/lib/cart";
import { formatPrice } from "@/data/products";
import { CartLineItem } from "@/components/CartLineItem";
import { Button } from "@/components/ui/Button";
import { CheckoutButton } from "@/components/CheckoutButton";
import { SegmentedControl } from "@/components/ui/SegmentedControl";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const lines = useCart((s) => s.lines);
  const fulfillment = useCart((s) => s.fulfillment);
  const setFulfillment = useCart((s) => s.setFulfillment);

  useEffect(() => {
    setMounted(true);
  }, []);

  const expanded = expandLines(lines);
  const subtotal = cartSubtotal(lines);
  const shipping = shippingCost(lines, fulfillment);
  const total = cartTotal(lines, fulfillment);
  const pickupOnly = hasPickupOnlyItem(lines);
  const effective = pickupOnly ? "pickup" : fulfillment;

  // Don't render cart contents until hydration completes (prevents flash)
  if (!mounted) {
    return (
      <main className="flex-1">
        <div className="container-page py-section">
          <p className="eyebrow">Loading your cart…</p>
        </div>
      </main>
    );
  }

  if (expanded.length === 0) {
    return (
      <main className="flex-1">
        <div className="container-page py-section">
          <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-surface-2 flex items-center justify-center text-ink-2 mb-6">
              <ShoppingBag className="h-7 w-7" aria-hidden />
            </div>
            <h1 className="font-display text-display-2 text-ink mb-3">
              Your cart is empty.
            </h1>
            <p className="text-md text-ink-2 leading-relaxed mb-8">
              Browse the shop and add a few things. Pickup is free, shipping is
              flat-rate, and we restock every Friday.
            </p>
            <Link href="/shop">
              <Button size="lg">
                Browse the shop
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1">
      <div className="container-page py-section-tight">
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 font-mono text-mono-tag text-ink-2 hover:text-accent transition-colors duration-fast mb-8"
        >
          <ArrowLeft className="h-3 w-3" aria-hidden />
          Keep shopping
        </Link>

        <h1 className="font-display text-display-2 text-ink tracking-tight mb-2">
          Your cart
        </h1>
        <p className="font-mono text-mono-tag text-ink-2 mb-10">
          {expanded.reduce((s, l) => s + l.quantity, 0)} items · review and
          checkout below
        </p>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Lines */}
          <div className="lg:col-span-7 space-y-8">
            {expanded.map((line) => (
              <div
                key={line.productId}
                className="pb-8 border-b border-rule last:border-b-0 last:pb-0"
              >
                <CartLineItem line={line} variant="page" />
              </div>
            ))}
          </div>

          {/* Summary */}
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-24 rounded-lg border border-rule bg-surface-2/40 p-6 space-y-6">
              <div>
                <p className="eyebrow mb-3">Fulfillment</p>
                <SegmentedControl
                  value={effective}
                  onChange={(v) => setFulfillment(v)}
                  options={[
                    { value: "pickup", label: "In-store pickup" },
                    { value: "ship", label: "Ship to me" },
                  ]}
                  label="Choose how to receive your order"
                />
                {pickupOnly ? (
                  <p className="mt-3 text-mono-tag font-mono text-ink-2">
                    Pickup required — your cart contains a perishable item.
                  </p>
                ) : effective === "ship" ? (
                  <p className="mt-3 text-mono-tag font-mono text-ink-2">
                    Flat-rate ground · 2-4 business days within the lower 48.
                  </p>
                ) : (
                  <p className="mt-3 text-mono-tag font-mono text-ink-2">
                    Free · ready within 2 hours during open hours.
                  </p>
                )}
              </div>

              <div className="space-y-2 font-mono text-mono-tag text-ink-2 pt-2 border-t border-rule">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="tabular-nums">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>
                    {effective === "pickup" ? "Pickup" : "Shipping"}
                  </span>
                  <span className="tabular-nums">
                    {effective === "pickup" ? "Free" : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-base text-ink pt-3 mt-3 border-t border-rule">
                  <span className="font-sans font-semibold">Total</span>
                  <span className="font-semibold tabular-nums">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              <CheckoutButton />

              <p className="text-mono-tag font-mono text-ink-3 text-center">
                By placing an order you agree to our{" "}
                <Link
                  href="/policies"
                  className="underline hover:text-accent transition-colors duration-fast"
                >
                  policies
                </Link>
                .
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
