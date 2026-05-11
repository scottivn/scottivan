/**
 * Cart store — Zustand, persisted to localStorage.
 *
 * Lines reference products by id. The selector helpers do the join to PRODUCTS
 * at call time so the store stays small + serializable.
 *
 * Hydration-safe: we initialize with the empty cart on SSR and let Zustand's
 * persist middleware rehydrate on the client. Components that render cart
 * counts should gate on a mounted flag to avoid SSR mismatch.
 */
"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { PRODUCTS, getProductById } from "@/data/products";
import type { Cart, CartLine, Product } from "@/lib/types";

interface CartStore extends Cart {
  addItem: (productId: string, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
  setFulfillment: (fulfillment: "pickup" | "ship") => void;
}

const initialCart: Cart = {
  lines: [],
  fulfillment: "pickup",
};

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      ...initialCart,
      addItem: (productId, quantity = 1) =>
        set((state) => {
          const product = getProductById(productId);
          if (!product) return state;

          const existing = state.lines.find((l) => l.productId === productId);
          if (existing) {
            const nextQty = Math.min(existing.quantity + quantity, product.stock);
            return {
              lines: state.lines.map((l) =>
                l.productId === productId ? { ...l, quantity: nextQty } : l,
              ),
            };
          }
          return {
            lines: [
              ...state.lines,
              {
                productId,
                quantity: Math.min(quantity, product.stock),
              },
            ],
          };
        }),
      updateQuantity: (productId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              lines: state.lines.filter((l) => l.productId !== productId),
            };
          }
          const product = getProductById(productId);
          const capped = product ? Math.min(quantity, product.stock) : quantity;
          return {
            lines: state.lines.map((l) =>
              l.productId === productId ? { ...l, quantity: capped } : l,
            ),
          };
        }),
      removeItem: (productId) =>
        set((state) => ({
          lines: state.lines.filter((l) => l.productId !== productId),
        })),
      clear: () => set({ lines: [], fulfillment: "pickup" }),
      setFulfillment: (fulfillment) => set({ fulfillment }),
    }),
    {
      name: "local-shop-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        lines: state.lines,
        fulfillment: state.fulfillment,
      }),
    },
  ),
);

// ============================================================
// Selectors / helpers
// ============================================================

export interface ExpandedLine extends CartLine {
  product: Product;
  subtotal: number;
}

export function expandLines(lines: CartLine[]): ExpandedLine[] {
  return lines
    .map((line) => {
      const product = PRODUCTS.find((p) => p.id === line.productId);
      if (!product) return null;
      return {
        ...line,
        product,
        subtotal: product.price * line.quantity,
      };
    })
    .filter((l): l is ExpandedLine => l !== null);
}

export function cartItemCount(lines: CartLine[]): number {
  return lines.reduce((sum, line) => sum + line.quantity, 0);
}

export function cartSubtotal(lines: CartLine[]): number {
  return expandLines(lines).reduce((sum, line) => sum + line.subtotal, 0);
}

const SHIPPING_FLAT = 1200; // cents, flat-rate ship

export function shippingCost(
  lines: CartLine[],
  fulfillment: "pickup" | "ship",
): number {
  if (fulfillment === "pickup") return 0;
  if (lines.length === 0) return 0;
  return SHIPPING_FLAT;
}

export function cartTotal(
  lines: CartLine[],
  fulfillment: "pickup" | "ship",
): number {
  return cartSubtotal(lines) + shippingCost(lines, fulfillment);
}

/** True if any line in the cart is for a pickup-only product. */
export function hasPickupOnlyItem(lines: CartLine[]): boolean {
  return expandLines(lines).some(
    (l) => l.product.fulfillment === "pickup-only",
  );
}
