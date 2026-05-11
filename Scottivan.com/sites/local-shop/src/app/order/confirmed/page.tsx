"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Check, AlertCircle, ArrowRight, Copy } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { API_URL, API_CONFIGURED } from "@/lib/api";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/data/products";

interface ConfirmedOrderResponse {
  orderId: string;
  status: string;
  totalAmount: number;
  currency: string;
  fulfillment: "pickup" | "ship";
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
  createdAt: string;
}

function OrderConfirmedInner() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const [order, setOrder] = useState<ConfirmedOrderResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const clearCart = useCart((s) => s.clear);

  useEffect(() => {
    if (!sessionId) {
      setErrorMessage("Missing session_id in URL.");
      setLoading(false);
      return;
    }
    if (!API_CONFIGURED) {
      setErrorMessage("API not configured for this build.");
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchOrder() {
      try {
        const res = await fetch(
          `${API_URL}/api/orders/by-session?session_id=${encodeURIComponent(sessionId!)}`,
        );
        if (cancelled) return;
        if (!res.ok) {
          const body = await res.json().catch(() => null);
          throw new Error(body?.error ?? `Lookup failed (${res.status})`);
        }
        const data = (await res.json()) as ConfirmedOrderResponse;
        if (!cancelled) {
          setOrder(data);
          setLoading(false);
          // Clear cart only after successful confirmation
          clearCart();
        }
      } catch (e) {
        if (!cancelled) {
          setErrorMessage(
            e instanceof Error ? e.message : "Could not load your order.",
          );
          setLoading(false);
        }
      }
    }

    fetchOrder();
    return () => {
      cancelled = true;
    };
  }, [sessionId, clearCart]);

  if (loading) {
    return (
      <div className="container-page py-section text-center">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-accent border-r-transparent animate-spin mb-6" />
        <p className="eyebrow mb-3">Looking up your order…</p>
        <p className="font-mono text-mono-tag text-ink-2">
          This can take a few seconds while Stripe&apos;s webhook fires.
        </p>
      </div>
    );
  }

  if (errorMessage || !order) {
    return (
      <div className="container-page py-section">
        <div className="max-w-md mx-auto text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-warn-soft text-warn mb-6">
            <AlertCircle className="h-5 w-5" aria-hidden />
          </div>
          <h1 className="font-display text-display-2 text-ink mb-4">
            Hmm, we can&apos;t find this order yet.
          </h1>
          <p className="text-md text-ink-2 leading-relaxed mb-8">
            {errorMessage ??
              "If you just completed checkout, give it a minute and refresh. If it persists, reach out and include the session ID from the URL."}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button onClick={() => window.location.reload()}>Retry</Button>
            <Link href="/contact">
              <Button variant="secondary">Contact us</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-section">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-success text-on-accent">
            <Check className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <p className="eyebrow">Order confirmed · test mode</p>
            <h1 className="font-display text-display-2 text-ink tracking-tight mt-1">
              Thanks — we got it.
            </h1>
          </div>
        </div>

        <div className="rounded-lg border border-rule bg-surface-2/50 p-6 md:p-8 mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <p className="eyebrow mb-1">Order ID</p>
              <div className="flex items-center gap-2">
                <span className="font-mono text-h3 text-ink">{order.orderId}</span>
                <button
                  type="button"
                  onClick={() => navigator.clipboard.writeText(order.orderId)}
                  aria-label="Copy order ID"
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full text-ink-2 hover:text-accent hover:bg-surface transition-colors duration-fast"
                >
                  <Copy className="h-3.5 w-3.5" aria-hidden />
                </button>
              </div>
            </div>
            <Badge tone="success">{order.status}</Badge>
          </div>

          <p className="text-small text-ink-2 leading-relaxed">
            Save your order ID and the email you used at checkout. You can look
            up your order at any time at{" "}
            <Link
              href="/orders/lookup"
              className="text-accent hover:text-accent-hover underline underline-offset-2"
            >
              /orders/lookup
            </Link>
            .
          </p>
        </div>

        {/* Line items */}
        <div className="mb-10">
          <p className="eyebrow mb-3">Items</p>
          <div className="border-t border-rule">
            {order.lines.map((l) => (
              <div
                key={l.productId}
                className="flex items-baseline justify-between gap-3 py-4 border-b border-rule"
              >
                <div className="min-w-0">
                  <p className="text-md text-ink truncate">{l.name}</p>
                  <p className="font-mono text-mono-tag text-ink-2 mt-0.5">
                    {l.unit} · qty {l.quantity}
                  </p>
                </div>
                <span className="font-mono text-mono-tag text-ink shrink-0 tabular-nums">
                  {formatPrice(l.subtotal)}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-baseline justify-between gap-3 pt-5">
            <span className="font-semibold text-ink">Total</span>
            <span className="font-mono text-h3 text-ink tabular-nums">
              {formatPrice(order.totalAmount)}
            </span>
          </div>
        </div>

        {/* Fulfillment details */}
        <div className="mb-10">
          <p className="eyebrow mb-3">Fulfillment</p>
          {order.fulfillment === "pickup" ? (
            <div className="rounded-lg border border-rule bg-surface-2/50 p-5">
              <p className="text-md text-ink mb-1">In-store pickup</p>
              <p className="text-small text-ink-2 leading-relaxed">
                Ready within 2 hours during open hours. We&apos;ll email when
                it&apos;s ready. Pickups are held for 7 days.
              </p>
              <Link
                href="/visit"
                className="mt-3 inline-flex items-center gap-1 text-small font-medium text-accent hover:text-accent-hover transition-colors duration-fast"
              >
                Hours &amp; address →
              </Link>
            </div>
          ) : (
            <div className="rounded-lg border border-rule bg-surface-2/50 p-5">
              <p className="text-md text-ink mb-1">Ship to</p>
              {order.shippingAddress ? (
                <p className="font-mono text-mono-tag text-ink-2 leading-relaxed">
                  {order.shippingAddress.line1}
                  {order.shippingAddress.line2 ? (
                    <>
                      <br />
                      {order.shippingAddress.line2}
                    </>
                  ) : null}
                  <br />
                  {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                  {order.shippingAddress.postalCode}
                </p>
              ) : (
                <p className="text-small text-ink-2">
                  Shipping address will appear here once Stripe finalizes the
                  payment intent.
                </p>
              )}
              <p className="mt-3 text-small text-ink-2 leading-relaxed">
                Ground service, 2-4 business days within the lower 48.
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link href="/shop">
            <Button>
              Keep shopping
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </Link>
          <Link href="/orders/lookup">
            <Button variant="secondary">Look up an order</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmedPage() {
  return (
    <main className="flex-1">
      <Suspense
        fallback={
          <div className="container-page py-section">
            <p className="eyebrow">Loading…</p>
          </div>
        }
      >
        <OrderConfirmedInner />
      </Suspense>
    </main>
  );
}
