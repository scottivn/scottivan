"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

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

interface LichessPerf {
  games?: number;
  runs?: number;
  rating: number;
  rd?: number;
  prog?: number;
}

interface LichessUser {
  username: string;
  perfs: {
    blitz: LichessPerf;
    rapid: LichessPerf;
    correspondence: LichessPerf;
    puzzle: LichessPerf;
    classical: LichessPerf;
    bullet: LichessPerf;
  };
  count: {
    all: number;
    win: number;
    loss: number;
    draw: number;
  };
  playTime?: { total: number; tv: number };
  createdAt: number;
}

// ─── VTSAX Widget ─────────────────────────────────────────────────────────────

function VTSAXWidget() {
  const [data, setData] = useState<VTSAXData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/vtsax")
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => {
        setData({ price: null, change: null, changePercent: null, previousClose: null, high52: null, low52: null, ytdReturn: null, marketState: "CLOSED", error: true });
        setLoading(false);
      });
  }, []);

  const isUp = (data?.change ?? 0) >= 0;
  const changeColor = isUp ? "#00ff88" : "#ff4d6d";

  // 52-week range bar position
  const rangePct =
    data?.price && data?.low52 && data?.high52
      ? Math.round(((data.price - data.low52) / (data.high52 - data.low52)) * 100)
      : null;

  return (
    <div className="terminal-box rounded-lg p-6 flex flex-col gap-4 h-full">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="font-mono text-xs text-[#94a3b8] mb-1">$ get-quote VTSAX</div>
          <h2 className="font-mono text-lg text-[#00ff88] glow-green font-bold">
            📈 VTSAX
          </h2>
          <div className="font-mono text-xs text-[#94a3b8]">
            Vanguard Total Stock Market Index
          </div>
        </div>
        <div className="text-right">
          <div
            className="font-mono text-xs px-2 py-0.5 rounded border"
            style={{
              color: data?.marketState === "REGULAR" ? "#00ff88" : "#94a3b8",
              borderColor: data?.marketState === "REGULAR" ? "rgba(0,255,136,0.4)" : "rgba(148,163,184,0.3)",
            }}
          >
            {data?.marketState === "REGULAR" ? "● LIVE" : "● CLOSED"}
          </div>
        </div>
      </div>

      {/* Price */}
      {loading ? (
        <div className="font-mono text-[#94a3b8] animate-pulse">fetching...</div>
      ) : data?.error || !data?.price ? (
        <div className="font-mono text-[#94a3b8] text-sm">
          market data unavailable —{" "}
          <a
            href="https://finance.yahoo.com/quote/VTSAX"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00d4ff] hover:underline"
          >
            check Yahoo Finance ↗
          </a>
        </div>
      ) : (
        <>
          <div className="flex items-end gap-3">
            <span className="font-mono text-4xl font-bold text-[#e2e8f0]">
              ${data.price.toFixed(2)}
            </span>
            <span
              className="font-mono text-sm pb-1 font-medium"
              style={{ color: changeColor }}
            >
              {isUp ? "+" : ""}
              {data.change?.toFixed(2)} ({isUp ? "+" : ""}
              {data.changePercent?.toFixed(2)}%)
            </span>
          </div>

          {/* 52-week range bar */}
          {rangePct !== null && (
            <div>
              <div className="flex justify-between font-mono text-xs text-[#94a3b8] mb-1">
                <span>52W Low ${data.low52?.toFixed(2)}</span>
                <span>52W High ${data.high52?.toFixed(2)}</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#1e293b] relative">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${rangePct}%`,
                    background: "linear-gradient(90deg, #00d4ff, #00ff88)",
                  }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#00ff88] border border-[#0a0e1a]"
                  style={{ left: `calc(${rangePct}% - 4px)` }}
                />
              </div>
              <div className="font-mono text-xs text-[#94a3b8] mt-1 text-center">
                {rangePct}th percentile of 52W range
              </div>
            </div>
          )}
        </>
      )}

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Expense Ratio", value: "0.04%", hint: "industry avg ~0.47%" },
          { label: "Fund Type", value: "Total Mkt Index", hint: "~3,700 US stocks" },
          { label: "Min Investment", value: "$3,000", hint: "or via ETF: VTI ($1)" },
          { label: "YTD Return", value: data?.ytdReturn ? `${(data.ytdReturn * 100).toFixed(1)}%` : "—", hint: loading ? "loading..." : "varies" },
        ].map(({ label, value, hint }) => (
          <div key={label} className="bg-[#0f172a] rounded p-2">
            <div className="font-mono text-xs text-[#94a3b8]">{label}</div>
            <div className="font-mono text-sm text-[#e2e8f0] font-medium">{value}</div>
            <div className="font-mono text-xs text-[#475569]">{hint}</div>
          </div>
        ))}
      </div>

      {/* Philosophy */}
      <div className="border-t border-[#1e293b] pt-4 font-mono text-xs text-[#94a3b8] leading-relaxed">
        <span className="text-[#00d4ff]">// philosophy: </span>
        The Simple Path to Wealth — buy VTSAX, hold forever, ignore the noise.
        Low cost beats stock picking. Time in market beats timing the market.
      </div>

      <a
        href="https://finance.yahoo.com/quote/VTSAX"
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-xs text-[#475569] hover:text-[#00d4ff] transition-colors mt-auto"
      >
        data via Yahoo Finance ↗
      </a>
    </div>
  );
}

// ─── Chess Widget ─────────────────────────────────────────────────────────────

function ChessWidget() {
  const [user, setUser] = useState<LichessUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://lichess.org/api/user/scottivn", {
      headers: { Accept: "application/json" },
    })
      .then((r) => {
        if (!r.ok) throw new Error("Lichess unavailable");
        return r.json();
      })
      .then((d) => {
        setUser(d);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const formats = [
    { key: "bullet", label: "Bullet", icon: "⚡" },
    { key: "blitz", label: "Blitz", icon: "🔥" },
    { key: "rapid", label: "Rapid", icon: "⏱️" },
    { key: "classical", label: "Classical", icon: "🎯" },
    { key: "correspondence", label: "Correspondence", icon: "✉️" },
    { key: "puzzle", label: "Puzzles", icon: "🧩" },
  ] as const;

  return (
    <div className="terminal-box rounded-lg p-6 flex flex-col gap-4 h-full">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="font-mono text-xs text-[#94a3b8] mb-1">$ lichess-stats scottivn</div>
          <h2 className="font-mono text-lg text-[#00ff88] glow-green font-bold">
            ♟️ Chess
          </h2>
          <a
            href="https://lichess.org/@/scottivn"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-[#00d4ff] hover:underline"
          >
            lichess/@/scottivn ↗
          </a>
        </div>
        {!loading && !error && user && (
          <div className="text-right font-mono text-xs text-[#94a3b8]">
            <div className="text-[#e2e8f0] text-sm font-medium">
              {user.count.all.toLocaleString()}
            </div>
            <div>total games</div>
          </div>
        )}
      </div>

      {loading ? (
        <div className="font-mono text-[#94a3b8] animate-pulse">fetching from lichess...</div>
      ) : error || !user ? (
        <div className="font-mono text-[#94a3b8] text-sm">
          stats unavailable —{" "}
          <a
            href="https://lichess.org/@/scottivn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00d4ff] hover:underline"
          >
            view on lichess ↗
          </a>
        </div>
      ) : (
        <>
          {/* Ratings grid */}
          <div className="grid grid-cols-2 gap-2">
            {formats.map(({ key, label, icon }) => {
              const perf = user.perfs[key];
              if (!perf) return null;
              const games = "games" in perf ? perf.games : perf.runs ?? 0;
              if (!games) return null;
              return (
                <div
                  key={key}
                  className="bg-[#0f172a] rounded p-2.5 flex items-center gap-2"
                >
                  <span className="text-base">{icon}</span>
                  <div className="min-w-0">
                    <div className="font-mono text-xs text-[#94a3b8]">{label}</div>
                    <div className="font-mono text-sm font-bold text-[#e2e8f0]">
                      {perf.rating}
                      {perf.prog !== undefined && perf.prog !== 0 && (
                        <span
                          className="text-xs ml-1"
                          style={{ color: perf.prog > 0 ? "#00ff88" : "#ff4d6d" }}
                        >
                          {perf.prog > 0 ? "↑" : "↓"}
                          {Math.abs(perf.prog)}
                        </span>
                      )}
                    </div>
                    <div className="font-mono text-xs text-[#475569]">
                      {games.toLocaleString()} {key === "puzzle" ? "puzzles" : "games"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Win/loss/draw */}
          <div>
            <div className="flex justify-between font-mono text-xs text-[#94a3b8] mb-1">
              <span>
                W{" "}
                <span className="text-[#00ff88]">{user.count.win.toLocaleString()}</span>
              </span>
              <span>
                D{" "}
                <span className="text-[#94a3b8]">{user.count.draw.toLocaleString()}</span>
              </span>
              <span>
                L{" "}
                <span className="text-[#ff4d6d]">{user.count.loss.toLocaleString()}</span>
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full flex overflow-hidden">
              {(() => {
                const total = user.count.win + user.count.draw + user.count.loss || 1;
                return (
                  <>
                    <div
                      className="h-full"
                      style={{ width: `${(user.count.win / total) * 100}%`, background: "#00ff88" }}
                    />
                    <div
                      className="h-full"
                      style={{ width: `${(user.count.draw / total) * 100}%`, background: "#475569" }}
                    />
                    <div
                      className="h-full"
                      style={{ width: `${(user.count.loss / total) * 100}%`, background: "#ff4d6d" }}
                    />
                  </>
                );
              })()}
            </div>
          </div>
        </>
      )}

      <div className="border-t border-[#1e293b] pt-4 font-mono text-xs text-[#94a3b8] leading-relaxed mt-auto">
        <span className="text-[#00d4ff]">// current focus: </span>
        grinding puzzles, slow improvement. Correspondence is my
        best format — actually get to think.
      </div>
    </div>
  );
}

// ─── BJJ Widget ───────────────────────────────────────────────────────────────

const BELT_COLORS: Record<string, { bg: string; text: string; stripes: string }> = {
  white:  { bg: "#e2e8f0", text: "#0a0e1a", stripes: "#94a3b8" },
  blue:   { bg: "#2563eb", text: "#fff",     stripes: "#1e40af" },
  purple: { bg: "#7c3aed", text: "#fff",     stripes: "#5b21b6" },
  brown:  { bg: "#78350f", text: "#fff",     stripes: "#451a03" },
  black:  { bg: "#111827", text: "#fbbf24",  stripes: "#fbbf24" },
};

function BeltDisplay({ belt, stripes }: { belt: string; stripes: number }) {
  const colors = BELT_COLORS[belt] ?? BELT_COLORS.white;
  return (
    <div className="flex items-center gap-3">
      {/* Belt bar */}
      <div
        className="h-5 rounded flex-1 flex items-center relative overflow-hidden"
        style={{ backgroundColor: colors.bg }}
      >
        {/* Black end tab */}
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-black/80" />
        {/* Stripe marks */}
        {Array.from({ length: stripes }).map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-1"
            style={{
              right: `${8 + i * 5}px`,
              backgroundColor: "#ffffff",
              opacity: 0.9,
            }}
          />
        ))}
      </div>
      <div className="font-mono text-xs text-[#94a3b8] whitespace-nowrap">
        {stripes} stripe{stripes !== 1 ? "s" : ""}
      </div>
    </div>
  );
}

function BJJWidget() {
  const belt = "purple";
  const stripes = 0;

  const milestones = [
    { belt: "white",  year: "2019", label: "Started training" },
    { belt: "blue",   year: "2020", label: "Blue belt" },
    { belt: "purple", year: "2023", label: "Purple belt ← now" },
  ];

  const focuses = [
    { label: "Guard passing", desc: "Torreando, over-under" },
    { label: "Leg locks", desc: "Heel hooks, kneebars" },
    { label: "Back control", desc: "Seat belt, bow & arrow" },
  ];

  return (
    <div className="terminal-box rounded-lg p-6 flex flex-col gap-4 h-full">
      {/* Header */}
      <div>
        <div className="font-mono text-xs text-[#94a3b8] mb-1">$ cat bjj.log</div>
        <h2 className="font-mono text-lg text-[#00ff88] glow-green font-bold">
          ⚔️ Brazilian Jiu-Jitsu
        </h2>
        <div className="font-mono text-xs text-[#94a3b8]">
          Rodrigo Pinheiro BJJ · Boerne, TX
        </div>
      </div>

      {/* Belt display */}
      <div>
        <div className="font-mono text-xs text-[#94a3b8] mb-2">current rank</div>
        <div className="flex items-center gap-3 mb-2">
          <div
            className="font-mono text-sm font-bold capitalize"
            style={{ color: BELT_COLORS[belt].bg }}
          >
            {belt} belt
          </div>
        </div>
        <BeltDisplay belt={belt} stripes={stripes} />
      </div>

      {/* Progression */}
      <div>
        <div className="font-mono text-xs text-[#94a3b8] mb-2">progression</div>
        <div className="flex items-center gap-0">
          {milestones.map((m, i) => (
            <div key={m.belt} className="flex items-center gap-0 flex-1">
              <div className="flex flex-col items-center">
                <div
                  className="w-3 h-3 rounded-full border-2"
                  style={{
                    backgroundColor:
                      m.belt === belt ? BELT_COLORS[m.belt].bg : "#1e293b",
                    borderColor:
                      m.belt === belt ? BELT_COLORS[m.belt].bg : "#334155",
                  }}
                />
                <div className="font-mono text-xs text-[#475569] mt-1">{m.year}</div>
                <div
                  className="font-mono text-xs capitalize"
                  style={{
                    color: m.belt === belt ? BELT_COLORS[m.belt].bg : "#475569",
                  }}
                >
                  {m.belt}
                </div>
              </div>
              {i < milestones.length - 1 && (
                <div className="h-px bg-[#1e293b] flex-1 mb-7" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Current focus */}
      <div>
        <div className="font-mono text-xs text-[#94a3b8] mb-2">current focus</div>
        <div className="flex flex-col gap-1.5">
          {focuses.map(({ label, desc }) => (
            <div key={label} className="flex items-center gap-2 font-mono text-xs">
              <span className="text-[#00ff88]">›</span>
              <span className="text-[#e2e8f0]">{label}</span>
              <span className="text-[#475569]">— {desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-[#1e293b] pt-4 font-mono text-xs text-[#94a3b8] leading-relaxed mt-auto">
        <span className="text-[#00d4ff]">// note: </span>
        BJJ is one of the few hobbies that humbles you daily and
        rewards consistent effort — same as software.
      </div>
    </div>
  );
}

// ─── K8s Lab Widget ───────────────────────────────────────────────────────────

function K8sWidget() {
  const stack = [
    { name: "EKS", desc: "Managed Kubernetes on AWS", status: "active" },
    { name: "Argo CD", desc: "GitOps continuous delivery", status: "active" },
    { name: "Argo Rollouts", desc: "Progressive delivery", status: "active" },
    { name: "Kyverno", desc: "Policy-as-code enforcement", status: "active" },
    { name: "Crossplane", desc: "Infrastructure from cluster", status: "exploring" },
    { name: "Backstage", desc: "Internal developer portal", status: "exploring" },
  ];

  const tiers = [
    {
      name: "Hub cluster",
      desc: "Management plane — Argo CD root, deploys to all downstream clusters via ApplicationSets",
      color: "#00ff88",
    },
    {
      name: "Regional clusters",
      desc: "Intermediate tier — environment segregation (dev/staging/prod), regional policy enforcement",
      color: "#00d4ff",
    },
    {
      name: "Workload clusters",
      desc: "Tenant clusters — app teams deploy here, isolated blast radius, GitOps-managed configs",
      color: "#ffd700",
    },
  ];

  return (
    <div className="terminal-box rounded-lg p-6 flex flex-col gap-4 h-full">
      {/* Header */}
      <div>
        <div className="font-mono text-xs text-[#94a3b8] mb-1">
          $ kubectl get experiments --all-namespaces
        </div>
        <h2 className="font-mono text-lg text-[#00ff88] glow-green font-bold">
          ☁️ K8s Lab
        </h2>
        <div className="font-mono text-xs text-[#94a3b8]">
          Three-tier Argo CD · EKS · GitOps at scale
        </div>
      </div>

      {/* Three-tier architecture */}
      <div>
        <div className="font-mono text-xs text-[#94a3b8] mb-2">
          architecture: three-tier cluster management
        </div>
        <div className="flex flex-col gap-2">
          {tiers.map((tier, i) => (
            <div key={tier.name} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div
                  className="w-6 h-6 rounded flex items-center justify-center font-mono text-xs font-bold text-[#0a0e1a] flex-shrink-0"
                  style={{ backgroundColor: tier.color }}
                >
                  {i + 1}
                </div>
                {i < tiers.length - 1 && (
                  <div className="w-px flex-1 my-1" style={{ backgroundColor: `${tier.color}33` }} />
                )}
              </div>
              <div className="pb-2">
                <div className="font-mono text-xs font-medium" style={{ color: tier.color }}>
                  {tier.name}
                </div>
                <div className="font-mono text-xs text-[#94a3b8] leading-relaxed">
                  {tier.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stack */}
      <div>
        <div className="font-mono text-xs text-[#94a3b8] mb-2">stack</div>
        <div className="grid grid-cols-2 gap-1.5">
          {stack.map(({ name, desc, status }) => (
            <div key={name} className="bg-[#0f172a] rounded p-2">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span
                  className="font-mono text-xs font-bold"
                  style={{ color: status === "active" ? "#00ff88" : "#ffd700" }}
                >
                  {name}
                </span>
                {status === "exploring" && (
                  <span className="font-mono text-xs text-[#475569]">↝</span>
                )}
              </div>
              <div className="font-mono text-xs text-[#475569]">{desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-[#1e293b] pt-4 font-mono text-xs text-[#94a3b8] leading-relaxed mt-auto">
        <span className="text-[#00d4ff]">// context: </span>
        Building this architecture at USAA to give app teams a
        self-service EKS offering — guardrails via policy, freedom via GitOps.
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LabPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Page header */}
        <div className="mb-10">
          <div className="font-mono text-sm text-[#94a3b8] mb-2">
            <span className="text-[#00ff88]">scott</span>
            <span className="text-[#94a3b8]">@ivan</span>
            <span className="text-[#475569]">:~$</span>
            <span className="ml-2 text-[#e2e8f0]">cd ./lab && ls -la</span>
          </div>
          <h1 className="font-mono text-3xl md:text-4xl font-bold text-[#e2e8f0] mb-3">
            <span className="text-[#00ff88] glow-green">./lab</span>
          </h1>
          <p className="font-mono text-[#94a3b8] max-w-xl">
            experiments, data, and things I track. live where possible.
          </p>
        </div>

        {/* Widget grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <VTSAXWidget />
          <ChessWidget />
          <BJJWidget />
          <K8sWidget />
        </div>

        {/* Footer nav */}
        <div className="mt-12 pt-8 border-t border-[#1e293b] flex gap-6 font-mono text-sm">
          <Link href="/" className="text-[#94a3b8] hover:text-[#00ff88] transition-colors">
            ← ~/home
          </Link>
          <Link href="/resume" className="text-[#94a3b8] hover:text-[#00ff88] transition-colors">
            ./resume
          </Link>
        </div>
      </div>
    </main>
  );
}
