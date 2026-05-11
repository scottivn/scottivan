import { Badge } from "@/components/ui/Badge";
import { Check, AlertCircle, X } from "lucide-react";
import type { Product } from "@/lib/types";
import { stockStatus } from "@/data/products";

interface StockBadgeProps {
  product: Product;
  showCount?: boolean;
}

/**
 * Three states — color + icon + text, never color-only (a11y).
 */
export function StockBadge({ product, showCount = false }: StockBadgeProps) {
  const status = stockStatus(product);

  if (status === "out") {
    return (
      <Badge tone="danger" icon={<X className="h-3 w-3" aria-hidden />}>
        Sold out
      </Badge>
    );
  }

  if (status === "low") {
    return (
      <Badge
        tone="warn"
        icon={<AlertCircle className="h-3 w-3" aria-hidden />}
      >
        {showCount ? `${product.stock} left` : "Low stock"}
      </Badge>
    );
  }

  return (
    <Badge tone="success" icon={<Check className="h-3 w-3" aria-hidden />}>
      In stock
    </Badge>
  );
}
