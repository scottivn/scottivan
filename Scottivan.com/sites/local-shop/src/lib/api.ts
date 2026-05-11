/**
 * Base URL of the local-shop API (HTTP API Gateway).
 * Set NEXT_PUBLIC_API_URL at build time to the URL output by infra/local-shop.yml.
 * For local dev without a deployed backend, leave unset — Checkout button stays disabled.
 */
export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export const API_CONFIGURED = API_URL.length > 0;
