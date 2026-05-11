"use client";

import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/types";
import { useCart } from "@/lib/cart";
import { useUI } from "@/lib/ui-store";
import { Button } from "@/components/ui/Button";
import { QtyStepper } from "@/components/ui/QtyStepper";
import { stockStatus } from "@/data/products";

interface AddToCartControlsProps {
  product: Product;
}

export function AddToCartControls({ product }: AddToCartControlsProps) {
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const addItem = useCart((s) => s.addItem);
  const openCart = useUI((s) => s.openCart);

  const status = stockStatus(product);
  const isOut = status === "out";

  function handleAdd() {
    if (isOut) return;
    addItem(product.id, qty);
    setJustAdded(true);
    openCart();
    setTimeout(() => setJustAdded(false), 1800);
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
      <QtyStepper
        value={qty}
        onChange={setQty}
        min={1}
        max={Math.max(1, product.stock)}
        size="md"
        label={`Quantity of ${product.name}`}
      />
      <Button
        size="lg"
        onClick={handleAdd}
        disabled={isOut}
        className="flex-1 sm:flex-none sm:min-w-[220px]"
        aria-live="polite"
      >
        {justAdded ? (
          <>
            <Check className="h-4 w-4" aria-hidden />
            Added to cart
          </>
        ) : isOut ? (
          "Sold out"
        ) : (
          <>
            <ShoppingBag className="h-4 w-4" aria-hidden />
            Add to cart
          </>
        )}
      </Button>
    </div>
  );
}
