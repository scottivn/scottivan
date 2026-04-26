"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface VTSAXData {
  price: number | null;
  change: number | null;
  changePercent: number | null;
  previousClose: number | null;
  high52: number | null;
  low52: number | null;
  ytdReturn: number | null;
  marketState: string;
  error?: boolean;
}

export default function InvestingCoda() {
  const [data, setData] = useState<VTSAXData | null>(null);

  useEffect(() => {
    fetch("/api/vtsax")
      .then((r) => r.json())
      .then(setData)
      .catch(() =>
        setData({
          price: null,
          change: null,
          changePercent: null,
          previousClose: null,
          high52: null,
          low52: null,
          ytdReturn: null,
          marketState: "CLOSED",
          error: true,
        })
      );
  }, []);

  const isUp = (data?.change ?? 0) >= 0;

  return (
    <section
      className="relative py-20 px-6"
      style={{ backgroundColor: "#09090B" }}
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* VTSAX Ticker */}
          {data && !data.error && data.price && (
            <div className="flex items-center justify-center gap-4 mb-8">
              <span
                className="text-xs uppercase tracking-widest"
                style={{ color: "#52525B" }}
              >
                VTSAX
              </span>
              <span className="text-lg font-medium" style={{ color: "#FAFAFA" }}>
                ${data.price.toFixed(2)}
              </span>
              <span
                className="text-sm"
                style={{ color: isUp ? "#00ff88" : "#ff4d6d" }}
              >
                {isUp ? "+" : ""}
                {data.changePercent?.toFixed(2)}%
              </span>
              <span className="text-xs" style={{ color: "#3F3F46" }}>
                {data.marketState === "REGULAR" ? "live" : "closed"}
              </span>
            </div>
          )}

          {/* Philosophy */}
          <blockquote
            className="text-lg md:text-xl leading-relaxed italic mb-4"
            style={{ color: "#A1A1AA" }}
          >
            &ldquo;The Simple Path to Wealth — buy VTSAX, hold forever,
            ignore the noise.&rdquo;
          </blockquote>
          <p className="text-xs" style={{ color: "#3F3F46" }}>
            Low cost beats stock picking. Time in market beats timing the market.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
