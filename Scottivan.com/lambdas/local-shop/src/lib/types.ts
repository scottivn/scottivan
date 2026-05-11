/**
 * Domain types for the local-shop Lambdas. Mirrors the site's `lib/types.ts`.
 * Kept in this directory so the Lambda bundle has no cross-workspace imports.
 *
 * Phase 6 will introduce a `packages/local-shop-catalog` shared package once
 * the admin panel needs both the site and the lambdas to read from the same
 * DynamoDB-backed catalog.
 */

export type Fulfillment = "pickup" | "ship";

/** What the client sends to /api/checkout. */
export interface CheckoutLineInput {
  productId: string;
  name: string;
  unit: string;
  /** Price in cents (USD). Server WILL re-validate against trusted catalog in Phase 6. */
  unitAmount: number;
  quantity: number;
}

export interface CheckoutRequestBody {
  lines: CheckoutLineInput[];
  fulfillment: Fulfillment;
  customerEmail?: string;
  /** Absolute URL of the cart page so Stripe can return on cancel. */
  cancelUrl: string;
  /** Absolute URL prefix for the order-confirmed page (Stripe appends ?session_id=). */
  successUrl: string;
}

export interface CheckoutResponse {
  url: string;
  sessionId: string;
}

/** Persisted order row in DynamoDB. PK = `orderId`. */
export interface OrderRecord {
  orderId: string; // human-friendly: "FL-2026-0001" style; derived from session
  stripeSessionId: string;
  status: "paid" | "fulfilled" | "cancelled" | "refunded";
  email: string;
  totalAmount: number;
  currency: string;
  fulfillment: Fulfillment;
  lines: Array<{
    productId: string;
    name: string;
    unit: string;
    quantity: number;
    unitAmount: number;
    subtotal: number;
  }>;
  shippingAddress?: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  createdAt: string; // ISO
  updatedAt: string;
}
