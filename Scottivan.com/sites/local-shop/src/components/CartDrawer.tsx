"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, ShoppingBag, Lock } from "lucide-react";
import { useUI } from "@/lib/ui-store";
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
import { IconButton } from "@/components/ui/IconButton";
import { SegmentedControl } from "@/components/ui/SegmentedControl";

export function CartDrawer() {
  const open = useUI((s) => s.cartDrawerOpen);
  const close = useUI((s) => s.closeCart);
  const lines = useCart((s) => s.lines);
  const fulfillment = useCart((s) => s.fulfillment);
  const setFulfillment = useCart((s) => s.setFulfillment);

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const firstFocusRef = useRef<HTMLButtonElement | null>(null);

  const expanded = expandLines(lines);
  const subtotal = cartSubtotal(lines);
  const shipping = shippingCost(lines, fulfillment);
  const total = cartTotal(lines, fulfillment);
  const itemCount = expanded.reduce((s, l) => s + l.quantity, 0);
  const pickupOnly = hasPickupOnlyItem(lines);

  // Effective fulfillment: pickup is forced if any item is pickup-only
  const effective = pickupOnly ? "pickup" : fulfillment;

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    firstFocusRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  return (
    <AnimatePresence>
      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Cart"
          className="fixed inset-0 z-drawer"
        >
          <motion.button
            type="button"
            aria-label="Close cart"
            className="absolute inset-0 bg-overlay"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          />

          <motion.div
            ref={dialogRef}
            className="absolute inset-y-0 right-0 w-full sm:w-[480px] bg-bg border-l border-rule shadow-xl flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.2, ease: [0, 0, 0.2, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-rule">
              <div className="flex items-baseline gap-3">
                <h2 className="font-display text-h2 text-ink">Your cart</h2>
                <span className="font-mono text-mono-tag text-ink-2">
                  {itemCount} {itemCount === 1 ? "item" : "items"}
                </span>
              </div>
              <IconButton
                label="Close cart"
                onClick={close}
                ref={firstFocusRef}
              >
                <X className="h-5 w-5" aria-hidden />
              </IconButton>
            </div>

            {/* Body */}
            {expanded.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center">
                <div className="w-14 h-14 rounded-full bg-surface-2 flex items-center justify-center text-ink-2">
                  <ShoppingBag className="h-6 w-6" aria-hidden />
                </div>
                <p className="font-display text-h3 text-ink">Empty for now</p>
                <p className="text-small text-ink-2 max-w-xs">
                  Add bread, butter, or a bottle of olive oil. We restock on
                  Friday.
                </p>
                <Link href="/shop" onClick={close}>
                  <Button size="md">Browse the shop</Button>
                </Link>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
                {expanded.map((line) => (
                  <CartLineItem
                    key={line.productId}
                    line={line}
                    variant="drawer"
                    onItemNavigate={close}
                  />
                ))}
              </div>
            )}

            {/* Footer */}
            {expanded.length > 0 ? (
              <div className="border-t border-rule px-5 py-5 space-y-4 bg-surface-2/40">
                <div>
                  <p className="eyebrow mb-2">Fulfillment</p>
                  <SegmentedControl
                    value={effective}
                    onChange={(v) => setFulfillment(v)}
                    options={[
                      { value: "pickup", label: "In-store pickup" },
                      { value: "ship", label: "Ship to me" },
                    ]}
                    label="Choose how to receive your order"
                    size="sm"
                  />
                  {pickupOnly ? (
                    <p className="mt-2 text-mono-tag font-mono text-ink-2">
                      Pickup required — your cart contains a perishable item.
                    </p>
                  ) : null}
                </div>

                <div className="space-y-1.5 font-mono text-mono-tag text-ink-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{effective === "pickup" ? "Pickup" : "Shipping"}</span>
                    <span>
                      {effective === "pickup" ? "Free" : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="pt-2 mt-2 border-t border-rule flex justify-between text-base text-ink">
                    <span className="font-sans font-semibold">Total</span>
                    <span className="font-semibold">{formatPrice(total)}</span>
                  </div>
                </div>

                <Link href="/cart" onClick={close} className="block">
                  <Button size="lg" className="w-full">
                    Review and checkout
                  </Button>
                </Link>

                <div className="flex items-center gap-2 justify-center text-mono-tag font-mono text-ink-3">
                  <Lock className="h-3 w-3" aria-hidden />
                  Secured by Stripe · test mode
                </div>
              </div>
            ) : null}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
