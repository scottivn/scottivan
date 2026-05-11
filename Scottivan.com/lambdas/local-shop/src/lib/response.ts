import type { APIGatewayProxyStructuredResultV2 } from "aws-lambda";

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export function json(
  statusCode: number,
  body: unknown,
  extraHeaders: Record<string, string> = {},
): APIGatewayProxyStructuredResultV2 {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      ...CORS_HEADERS,
      ...extraHeaders,
    },
    body: JSON.stringify(body),
  };
}

export function text(
  statusCode: number,
  body: string,
): APIGatewayProxyStructuredResultV2 {
  return {
    statusCode,
    headers: { "Content-Type": "text/plain", ...CORS_HEADERS },
    body,
  };
}

export function error(
  statusCode: number,
  message: string,
  detail?: unknown,
): APIGatewayProxyStructuredResultV2 {
  return json(statusCode, { error: message, detail });
}
