/**
 * POST /api/checkout
 *
 * Creates a Stripe Checkout session for the cart and returns the hosted-page URL.
 * Phase 4 trusts the line items the client sends (this is a demo, not production —
 * Phase 6 will validate against DynamoDB-backed catalog).
 */
import type { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { stripe } from "@/lib/stripe";
import { error, json } from "@/lib/response";
import type {
  CheckoutRequestBody,
  CheckoutResponse,
} from "@/lib/types";

const MIN_LINE_AMOUNT_CENTS = 50; // Stripe minimum
const MAX_LINE_ITEMS = 50;
const FLAT_SHIPPING_AMOUNT = 1200;

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  if (event.requestContext.http.method === "OPTIONS") {
    return json(200, { ok: true });
  }
  if (event.requestContext.http.method !== "POST") {
    return error(405, "Method not allowed");
  }
  if (!event.body) {
    return error(400, "Missing body");
  }

  let body: CheckoutRequestBody;
  try {
    body = JSON.parse(event.body) as CheckoutRequestBody;
  } catch {
    return error(400, "Invalid JSON");
  }

  if (!body.lines || !Array.isArray(body.lines) || body.lines.length === 0) {
    return error(400, "Cart is empty");
  }
  if (body.lines.length > MAX_LINE_ITEMS) {
    return error(400, "Too many line items");
  }
  if (!body.successUrl || !body.cancelUrl) {
    return error(400, "successUrl and cancelUrl are required");
  }
  if (body.fulfillment !== "pickup" && body.fulfillment !== "ship") {
    return error(400, "fulfillment must be 'pickup' or 'ship'");
  }

  // Shape line items for Stripe
  const lineItems: Array<{
    price_data: {
      currency: string;
      product_data: { name: string; metadata: Record<string, string> };
      unit_amount: number;
    };
    quantity: number;
  }> = [];

  for (const l of body.lines) {
    if (
      !l.productId ||
      !l.name ||
      typeof l.unitAmount !== "number" ||
      l.unitAmount < MIN_LINE_AMOUNT_CENTS ||
      typeof l.quantity !== "number" ||
      l.quantity < 1 ||
      l.quantity > 99
    ) {
      return error(400, "Invalid line item", l);
    }
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: `${l.name} · ${l.unit}`,
          metadata: { productId: l.productId, unit: l.unit },
        },
        unit_amount: Math.round(l.unitAmount),
      },
      quantity: l.quantity,
    });
  }

  // Shipping (flat-rate; only when shipping is requested)
  let shippingOptions: Array<{
    shipping_rate_data: {
      type: "fixed_amount";
      display_name: string;
      fixed_amount: { amount: number; currency: string };
      delivery_estimate: {
        minimum: { unit: "business_day"; value: number };
        maximum: { unit: "business_day"; value: number };
      };
    };
  }> = [];
  if (body.fulfillment === "ship") {
    shippingOptions = [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          display_name: "Ground (2-4 business days)",
          fixed_amount: { amount: FLAT_SHIPPING_AMOUNT, currency: "usd" },
          delivery_estimate: {
            minimum: { unit: "business_day", value: 2 },
            maximum: { unit: "business_day", value: 4 },
          },
        },
      },
    ];
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      shipping_address_collection:
        body.fulfillment === "ship" ? { allowed_countries: ["US"] } : undefined,
      shipping_options: shippingOptions.length ? shippingOptions : undefined,
      success_url: `${body.successUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: body.cancelUrl,
      customer_email: body.customerEmail,
      metadata: {
        fulfillment: body.fulfillment,
      },
      payment_intent_data: {
        metadata: {
          fulfillment: body.fulfillment,
        },
      },
    });

    if (!session.url || !session.id) {
      return error(500, "Stripe did not return a checkout URL");
    }

    const response: CheckoutResponse = {
      url: session.url,
      sessionId: session.id,
    };
    return json(200, response);
  } catch (e) {
    console.error("checkout error", e);
    const message = e instanceof Error ? e.message : "Unknown Stripe error";
    return error(502, "Could not create checkout session", message);
  }
};
