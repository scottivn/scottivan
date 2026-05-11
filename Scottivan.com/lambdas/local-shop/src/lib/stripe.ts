import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY;
if (!secretKey) {
  throw new Error("STRIPE_SECRET_KEY env var is required");
}

export const stripe = new Stripe(secretKey, {
  apiVersion: "2024-06-20",
  // Lambdas are short-lived; small max-network-retries is fine.
  maxNetworkRetries: 2,
});

export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
