import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://query1.finance.yahoo.com/v7/finance/quote?symbols=VTSAX&fields=regularMarketPrice,regularMarketChange,regularMarketChangePercent,regularMarketPreviousClose,fiftyTwoWeekHigh,fiftyTwoWeekLow,ytdReturn,marketState",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "application/json",
        },
        next: { revalidate: 300 }, // cache 5 min
      }
    );

    if (!res.ok) throw new Error(`Yahoo Finance returned ${res.status}`);

    const json = await res.json();
    const q = json?.quoteResponse?.result?.[0];

    if (!q) throw new Error("No quote data in response");

    return NextResponse.json({
      price: q.regularMarketPrice ?? null,
      change: q.regularMarketChange ?? null,
      changePercent: q.regularMarketChangePercent ?? null,
      previousClose: q.regularMarketPreviousClose ?? null,
      high52: q.fiftyTwoWeekHigh ?? null,
      low52: q.fiftyTwoWeekLow ?? null,
      ytdReturn: q.ytdReturn ?? null,
      marketState: q.marketState ?? "CLOSED",
    });
  } catch {
    // Return a graceful null payload — the widget will show stale/unavailable state
    return NextResponse.json({
      price: null,
      change: null,
      changePercent: null,
      previousClose: null,
      high52: null,
      low52: null,
      ytdReturn: null,
      marketState: "CLOSED",
      error: true,
    });
  }
}
