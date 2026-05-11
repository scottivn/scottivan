"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/cn";

const HOURS = [
  { day: "Mon", range: "8a – 7p" },
  { day: "Tue", range: "8a – 7p" },
  { day: "Wed", range: "8a – 7p" },
  { day: "Thu", range: "8a – 7p" },
  { day: "Fri", range: "8a – 7p" },
  { day: "Sat", range: "8a – 7p" },
  { day: "Sun", range: "9a – 4p" },
];

const TODAY_INDEX_MAP = [6, 0, 1, 2, 3, 4, 5]; // JS Sunday=0 → display index 6

export function HoursStrip() {
  // Avoid SSR mismatch: only highlight "today" after mount
  const [todayIdx, setTodayIdx] = useState<number | null>(null);
  useEffect(() => {
    setTodayIdx(TODAY_INDEX_MAP[new Date().getDay()]);
  }, []);

  return (
    <section className="border-t border-rule bg-bg-inverse text-ink-inverse">
      <div className="container-page py-section-tight md:py-section">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 text-mono-tag font-mono text-ink-inverse/70 mb-3">
              <Clock className="h-3.5 w-3.5" aria-hidden />
              This week
            </div>
            <h2 className="font-display text-h1 text-ink-inverse tracking-tight">
              Open seven days.
            </h2>
            <p className="mt-4 text-md text-ink-inverse/80 leading-relaxed max-w-md">
              Bread on the counter by 7am. Restocks every Friday. Closed for a
              few holidays — see the visit page for the full list.
            </p>
          </div>

          <div className="lg:col-span-5">
            <ul
              role="list"
              className="grid grid-cols-7 gap-2 text-center font-mono text-mono-tag"
            >
              {HOURS.map((h, idx) => {
                const isToday = idx === todayIdx;
                return (
                  <li
                    key={h.day}
                    className={cn(
                      "rounded-md py-3 px-1 border transition-colors duration-fast",
                      isToday
                        ? "bg-accent text-on-accent border-accent"
                        : "border-rule-strong/30 text-ink-inverse/70",
                    )}
                  >
                    <div className="uppercase">{h.day}</div>
                    <div className="mt-1 text-[10px] leading-tight">{h.range}</div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="lg:col-span-3 lg:text-right">
            <div className="font-mono text-mono-tag text-ink-inverse/70 mb-3 flex lg:justify-end items-center gap-2">
              <MapPin className="h-3.5 w-3.5" aria-hidden />
              248 Greene St
            </div>
            <p className="text-md text-ink-inverse/90">Hudson, NY 12534</p>
            <Link
              href="/visit"
              className="mt-5 inline-flex items-center gap-1.5 text-base font-medium text-accent hover:opacity-80 transition-opacity duration-fast"
            >
              Get directions →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
