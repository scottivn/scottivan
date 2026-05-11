/**
 * POST /api/stripe-webhook
 *
 * Verifies Stripe's signature, then on `checkout.session.completed` persists
 * the order to DynamoDB. Idempotent — replays update the existing record
 * rather than duplicating.
 */
import type { APIGatewayProxyHandlerV2 } from "aws-lambda";
import type Stripe from "stripe";
import { stripe, STRIPE_WEBHOOK_SECRET } from "@/lib/stripe";
import { ddb, ORDERS_TABLE } from "@/lib/dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { error, json } from "@/lib/response";
import type { OrderRecord } from "@/lib/types";

const ORDER_ID_PREFIX = "FL"; // Field & Larder

function deriveOrderId(sessionId: string): string {
  // Short, human-friendly. Stripe session IDs look like `cs_test_a1b2c3...`
  const tail = sessionId.replace(/^cs_(test_|live_)?/, "").slice(0, 10).toUpperCase();
  return `${ORDER_ID_PREFIX}-${tail}`;
}

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  if (!STRIPE_WEBHOOK_SECRET) {
    return error(500, "STRIPE_WEBHOOK_SECRET not configured");
  }
  if (event.requestContext.http.method !== "POST") {
    return error(405, "Method not allowed");
  }
  const signature = event.headers["stripe-signature"];
  if (!signature) {
    return error(400, "Missing stripe-signature header");
  }
  if (!event.body) {
    return error(400, "Missing body");
  }

  // Stripe requires the raw body for signature verification. API Gateway HTTP API
  // delivers the body as base64 when isBase64Encoded is true.
  const rawBody = event.isBase64Encoded
    ? Buffer.from(event.body, "base64").toString("utf8")
    : event.body;

  let stripeEvent: Stripe.Event;
  try {
    stripeEvent = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      STRIPE_WEBHOOK_SECRET,
    );
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    console.warn("signature verification failed", message);
    return error(400, `Signature verification failed: ${message}`);
  }

  if (stripeEvent.type !== "checkout.session.completed") {
    // We currently only persist completed checkouts; everything else acked.
    return json(200, { received: true, ignored: stripeEvent.type });
  }

  const session = stripeEvent.data.object as Stripe.Checkout.Session;

  // Expand line items inline (Stripe doesn't include them on the session by default)
  let lineItems: Stripe.ApiList<Stripe.LineItem>;
  try {
    lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      limit: 100,
      expand: ["data.price.product"],
    });
  } catch (e) {
    console.error("could not list line items", e);
    return error(502, "Could not list line items");
  }

  const orderId = deriveOrderId(session.id);
  const now = new Date().toISOString();
  const fulfillment =
    session.metadata?.fulfillment === "ship" ? "ship" : "pickup";

  const record: OrderRecord = {
    orderId,
    stripeSessionId: session.id,
    status: "paid",
    email:
      session.customer_details?.email ??
      session.customer_email ??
      "unknown@unknown",
    totalAmount: session.amount_total ?? 0,
    currency: session.currency ?? "usd",
    fulfillment,
    lines: lineItems.data.map((li) => {
      const product = li.price?.product as Stripe.Product | undefined;
      const meta = product?.metadata ?? {};
      const unitAmount = li.price?.unit_amount ?? 0;
      const quantity = li.quantity ?? 0;
      return {
        productId: meta.productId ?? "unknown",
        name: product?.name ?? li.description ?? "Item",
        unit: meta.unit ?? "",
        quantity,
        unitAmount,
        subtotal: unitAmount * quantity,
      };
    }),
    shippingAddress: session.shipping_details?.address
      ? {
          line1: session.shipping_details.address.line1 ?? "",
          line2: session.shipping_details.address.line2 ?? undefined,
          city: session.shipping_details.address.city ?? "",
          state: session.shipping_details.address.state ?? "",
          postalCode: session.shipping_details.address.postal_code ?? "",
          country: session.shipping_details.address.country ?? "US",
        }
      : undefined,
    createdAt: now,
    updatedAt: now,
  };

  try {
    await ddb.send(
      new PutCommand({
        TableName: ORDERS_TABLE,
        Item: record,
      }),
    );
  } catch (e) {
    console.error("dynamodb put failed", e);
    return error(500, "Could not persist order");
  }

  return json(200, { received: true, orderId });
};
