"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { useCart, expandLines } from "@/lib/cart";
import { API_URL, API_CONFIGURED } from "@/lib/api";
import { Button } from "@/components/ui/Button";

interface CheckoutButtonProps {
  /** Where to send the user on Stripe success. Stripe will append ?session_id= */
  successUrl?: string;
  /** Where to send the user on Stripe cancel */
  cancelUrl?: string;
}

export function CheckoutButton({
  successUrl,
  cancelUrl,
}: CheckoutButtonProps) {
  const lines = useCart((s) => s.lines);
  const fulfillment = useCart((s) => s.fulfillment);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const expanded = expandLines(lines);
  const isEmpty = expanded.length === 0;
  const cannotCheckout = isEmpty || !API_CONFIGURED;

  async function handleCheckout() {
    if (cannotCheckout) return;
    setLoading(true);
    setErrorMessage(null);

    const origin = typeof window !== "undefined" ? window.location.origin : "";

    try {
      const response = await fetch(`${API_URL}/api/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lines: expanded.map((l) => ({
            productId: l.product.id,
            name: l.product.name,
            unit: l.product.unit,
            unitAmount: l.product.price,
            quantity: l.quantity,
          })),
          fulfillment,
          successUrl: successUrl ?? `${origin}/order/confirmed`,
          cancelUrl: cancelUrl ?? `${origin}/cart`,
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error ?? `Checkout failed (${response.status})`);
      }

      const data = (await response.json()) as { url: string };
      if (!data.url) throw new Error("No checkout URL returned");
      window.location.assign(data.url);
    } catch (e) {
      setErrorMessage(
        e instanceof Error ? e.message : "Could not start checkout.",
      );
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <Button
        size="lg"
        className="w-full"
        onClick={handleCheckout}
        disabled={cannotCheckout || loading}
        loading={loading}
      >
        {!API_CONFIGURED
          ? "Checkout — backend not yet configured"
          : isEmpty
            ? "Cart is empty"
            : loading
              ? "Redirecting to Stripe…"
              : "Checkout securely"}
      </Button>

      {errorMessage ? (
        <p
          role="alert"
          className="text-mono-tag font-mono text-danger text-center"
        >
          {errorMessage}
        </p>
      ) : null}

      <div className="flex items-center gap-2 justify-center text-mono-tag font-mono text-ink-3">
        <Lock className="h-3 w-3" aria-hidden />
        Secured by Stripe · test mode
      </div>
    </div>
  );
}
