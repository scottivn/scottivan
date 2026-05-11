/**
 * GET /api/orders/by-session?session_id={cs_...}
 *
 * Looks up the order written by the webhook. Used by /order/confirmed to
 * render line items + total. Queries the StripeSessionIndex GSI.
 *
 * Has a small retry budget — Stripe webhooks usually land within seconds of
 * the success redirect, but the order may not exist yet on the first call.
 */
import type { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { ddb, ORDERS_TABLE } from "@/lib/dynamodb";
import { error, json } from "@/lib/response";
import type { OrderRecord } from "@/lib/types";

const GSI_NAME = "StripeSessionIndex";
const MAX_RETRIES = 4;
const RETRY_DELAY_MS = 750;

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function findOrderBySession(
  sessionId: string,
): Promise<OrderRecord | null> {
  const out = await ddb.send(
    new QueryCommand({
      TableName: ORDERS_TABLE,
      IndexName: GSI_NAME,
      KeyConditionExpression: "stripeSessionId = :s",
      ExpressionAttributeValues: { ":s": sessionId },
      Limit: 1,
    }),
  );
  return (out.Items?.[0] as OrderRecord | undefined) ?? null;
}

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  if (event.requestContext.http.method === "OPTIONS") {
    return json(200, { ok: true });
  }
  if (event.requestContext.http.method !== "GET") {
    return error(405, "Method not allowed");
  }

  const sessionId =
    event.queryStringParameters?.session_id ??
    event.queryStringParameters?.sessionId;
  if (!sessionId) {
    return error(400, "session_id query parameter is required");
  }
  if (!/^cs_(test_|live_)?[A-Za-z0-9]+$/.test(sessionId)) {
    return error(400, "Invalid session_id format");
  }

  let order: OrderRecord | null = null;
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    order = await findOrderBySession(sessionId);
    if (order) break;
    if (attempt < MAX_RETRIES - 1) {
      await sleep(RETRY_DELAY_MS);
    }
  }

  if (!order) {
    return error(
      404,
      "Order not found. The webhook may still be processing — try again in a moment.",
    );
  }

  // Don't leak email; the confirmation page already knows it.
  // (Phase 5 order-lookup endpoint enforces email match.)
  return json(200, {
    orderId: order.orderId,
    status: order.status,
    totalAmount: order.totalAmount,
    currency: order.currency,
    fulfillment: order.fulfillment,
    lines: order.lines,
    shippingAddress: order.shippingAddress,
    createdAt: order.createdAt,
  });
};
