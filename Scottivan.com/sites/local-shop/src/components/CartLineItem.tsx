"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import type { ExpandedLine } from "@/lib/cart";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/data/products";
import { ProductImage } from "@/components/ProductImage";
import { QtyStepper } from "@/components/ui/QtyStepper";

interface CartLineItemProps {
  line: ExpandedLine;
  variant?: "drawer" | "page";
  onItemNavigate?: () => void;
}

export function CartLineItem({
  line,
  variant = "drawer",
  onItemNavigate,
}: CartLineItemProps) {
  const update = useCart((s) => s.updateQuantity);
  const remove = useCart((s) => s.removeItem);

  const isDrawer = variant === "drawer";

  return (
    <div className="flex gap-4">
      <Link
        href={`/shop/${line.product.slug}`}
        onClick={onItemNavigate}
        className="shrink-0 rounded-md focus-visible:outline-none focus-visible:shadow-focus"
      >
        <ProductImage
          hue={line.product.hue}
          alt={`${line.product.name} thumbnail`}
          ratio="square"
          className={isDrawer ? "w-20" : "w-24 md:w-28"}
        />
      </Link>

      <div className="flex-1 min-w-0 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={`/shop/${line.product.slug}`}
              onClick={onItemNavigate}
              className="block font-display text-md text-ink hover:text-accent transition-colors duration-fast truncate"
            >
              {line.product.name}
            </Link>
            <p className="font-mono text-mono-tag text-ink-2 mt-0.5">
              {line.product.unit}
            </p>
          </div>
          <span className="font-mono text-mono-tag text-ink shrink-0">
            {formatPrice(line.subtotal)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 mt-auto">
          <QtyStepper
            value={line.quantity}
            onChange={(q) => update(line.productId, q)}
            size="sm"
            min={0}
            max={line.product.stock}
            label={`Quantity of ${line.product.name}`}
          />
          <button
            type="button"
            onClick={() => remove(line.productId)}
            aria-label={`Remove ${line.product.name}`}
            className="inline-flex items-center gap-1.5 text-small text-ink-2 hover:text-danger transition-colors duration-fast focus-visible:outline-none focus-visible:shadow-focus rounded px-1"
          >
            <Trash2 className="h-3.5 w-3.5" aria-hidden />
            <span className="hidden sm:inline">Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
}
