"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Component {
  name: string;
  desc: string;
  x: number;
  y: number;
  tier: number;
}

interface Connection {
  from: number;
  to: number;
}

const COMPONENTS: Component[] = [
  // Tier 1 — Hub
  { name: "Argo CD", desc: "GitOps engine — watches Git repos, syncs desired state to clusters", x: 50, y: 12, tier: 1 },
  { name: "ApplicationSets", desc: "Templated app deployment across multiple clusters from a single definition", x: 25, y: 12, tier: 1 },
  { name: "Hub Config", desc: "Central config store — cluster registry, RBAC policies, secrets", x: 75, y: 12, tier: 1 },

  // Tier 2 — Regional
  { name: "Kyverno", desc: "Policy engine — validates and mutates resources against security rules", x: 30, y: 45, tier: 2 },
  { name: "Env Gate", desc: "Environment segregation — dev/staging/prod promotion gates", x: 55, y: 45, tier: 2 },
  { name: "Policy Sync", desc: "Distributes OPA/Kyverno policies from hub to regional clusters", x: 80, y: 45, tier: 2 },

  // Tier 3 — Workload
  { name: "Argo Rollouts", desc: "Progressive delivery — canary, blue-green, analysis-driven rollbacks", x: 20, y: 78, tier: 3 },
  { name: "Pods", desc: "Application workloads running in isolated tenant namespaces", x: 45, y: 78, tier: 3 },
  { name: "Services", desc: "Network endpoints exposing pod workloads within and across namespaces", x: 70, y: 78, tier: 3 },
];

const CONNECTIONS: Connection[] = [
  { from: 0, to: 3 },
  { from: 0, to: 4 },
  { from: 1, to: 3 },
  { from: 2, to: 5 },
  { from: 3, to: 6 },
  { from: 4, to: 7 },
  { from: 5, to: 6 },
  { from: 4, to: 8 },
];

const TIER_COLORS = ["", "#22D3EE", "#3B82F6", "#10B981"];
const TIER_LABELS = ["", "Hub Cluster", "Regional Clusters", "Workload Clusters"];
const TIER_DESCS = [
  "",
  "Management plane — the single source of truth",
  "Environment segregation and policy enforcement",
  "Tenant clusters — where apps actually run",
];

const DEPLOY_STEPS = [
  { label: "Git Push", desc: "Developer commits manifest changes", nodes: [], tier: 0 },
  { label: "Argo CD Sync", desc: "Drift detected → sync initiated from hub", nodes: [0, 1, 2], tier: 1 },
  { label: "Policy Validation", desc: "Kyverno validates against security policies", nodes: [3, 4, 5], tier: 2 },
  { label: "Progressive Rollout", desc: "Canary deployment via Argo Rollouts", nodes: [6], tier: 3 },
  { label: "Deployed", desc: "Pods healthy, services routing traffic", nodes: [7, 8], tier: 3 },
];

function NodeComponent({
  comp,
  index,
  isActive,
  isDeployed,
  onHover,
  activeTooltip,
}: {
  comp: Component;
  index: number;
  isActive: boolean;
  isDeployed: boolean;
  onHover: (idx: number | null) => void;
  activeTooltip: number | null;
}) {
  const color = TIER_COLORS[comp.tier];
  const showTooltip = activeTooltip === index;

  return (
    <g
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onHover(showTooltip ? null : index)}
      className="cursor-pointer"
    >
      {/* Glow */}
      {(isActive || isDeployed) && (
        <circle
          cx={comp.x * 6}
          cy={comp.y * 4.5}
          r="28"
          fill={color}
          opacity={0.1}
        >
          {isActive && (
            <animate
              attributeName="r"
              values="28;35;28"
              dur="1.5s"
              repeatCount="indefinite"
            />
          )}
        </circle>
      )}

      {/* Node circle */}
      <circle
        cx={comp.x * 6}
        cy={comp.y * 4.5}
        r="18"
        fill={isActive || isDeployed ? `${color}20` : "#0B112010"}
        stroke={isActive || isDeployed ? color : "#1E3A5F"}
        strokeWidth={isActive ? 2.5 : 1.5}
        style={{
          transition: "all 0.5s ease",
          filter: isActive ? `drop-shadow(0 0 8px ${color}60)` : "none",
        }}
      />

      {/* Status dot */}
      {isDeployed && (
        <circle
          cx={comp.x * 6 + 12}
          cy={comp.y * 4.5 - 12}
          r="4"
          fill="#10B981"
        />
      )}

      {/* Label */}
      <text
        x={comp.x * 6}
        y={comp.y * 4.5 + 1}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={isActive || isDeployed ? color : "#64748B"}
        fontSize="7"
        fontFamily="'JetBrains Mono', monospace"
        fontWeight={isActive ? 700 : 500}
        style={{ transition: "fill 0.3s, font-weight 0.3s" }}
      >
        {comp.name}
      </text>

      {/* Tooltip */}
      {showTooltip && (
        <foreignObject
          x={Math.min(Math.max(comp.x * 6 - 90, 5), 330)}
          y={comp.y * 4.5 + 24}
          width="180"
          height="60"
        >
          <div
            style={{
              backgroundColor: "#0F1B2E",
              border: `1px solid ${color}40`,
              borderRadius: "8px",
              padding: "8px 10px",
              fontSize: "9px",
              color: "#94A3B8",
              lineHeight: 1.4,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <span style={{ color, fontWeight: 600 }}>{comp.name}</span>
            <br />
            {comp.desc}
          </div>
        </foreignObject>
      )}
    </g>
  );
}

export default function K8sSection() {
  const [deployStep, setDeployStep] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [tooltip, setTooltip] = useState<number | null>(null);
  const [deployedNodes, setDeployedNodes] = useState<Set<number>>(new Set());

  const deploy = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDeployStep(0);
    setDeployedNodes(new Set());
  }, [isAnimating]);

  const reset = useCallback(() => {
    setDeployStep(-1);
    setIsAnimating(false);
    setDeployedNodes(new Set());
  }, []);

  useEffect(() => {
    if (deployStep < 0 || deployStep >= DEPLOY_STEPS.length) return;

    const timer = setTimeout(() => {
      const step = DEPLOY_STEPS[deployStep];
      setDeployedNodes((prev) => {
        const next = new Set(prev);
        step.nodes.forEach((n) => next.add(n));
        return next;
      });

      if (deployStep < DEPLOY_STEPS.length - 1) {
        setDeployStep((s) => s + 1);
      } else {
        setIsAnimating(false);
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [deployStep]);

  const activeNodes = deployStep >= 0 ? DEPLOY_STEPS[deployStep]?.nodes ?? [] : [];
  const currentStep = deployStep >= 0 ? DEPLOY_STEPS[deployStep] : null;

  return (
    <section
      id="k8s"
      className="min-h-screen relative overflow-hidden flex items-center"
      style={{ backgroundColor: "#0B1120" }}
    >
      {/* Blueprint grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-24 md:py-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <p
            className="text-xs uppercase tracking-[0.25em] mb-4"
            style={{ color: "#22D3EE" }}
          >
            Kubernetes
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-4"
            style={{ color: "#E2E8F0" }}
          >
            Three-Tier Architecture
          </h2>
          <p className="text-sm max-w-xl" style={{ color: "#475569" }}>
            GitOps-driven EKS platform. Hub cluster manages regional clusters,
            which govern workload clusters. Argo CD all the way down.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Diagram */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              className="rounded-xl border overflow-hidden"
              style={{
                backgroundColor: "rgba(11, 17, 32, 0.8)",
                borderColor: "rgba(59, 130, 246, 0.15)",
              }}
            >
              <svg
                viewBox="0 0 540 420"
                className="w-full"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {/* Tier backgrounds */}
                {[1, 2, 3].map((tier) => {
                  const yStart = tier === 1 ? 15 : tier === 2 ? 155 : 295;
                  return (
                    <g key={tier}>
                      <rect
                        x="10"
                        y={yStart}
                        width="520"
                        height="110"
                        rx="8"
                        fill={`${TIER_COLORS[tier]}05`}
                        stroke={`${TIER_COLORS[tier]}15`}
                        strokeWidth="1"
                        strokeDasharray="4 4"
                      />
                      <text
                        x="25"
                        y={yStart + 16}
                        fill={`${TIER_COLORS[tier]}60`}
                        fontSize="8"
                        fontWeight="600"
                        style={{ textTransform: "uppercase" }}
                      >
                        {TIER_LABELS[tier]}
                      </text>
                    </g>
                  );
                })}

                {/* Connections */}
                {CONNECTIONS.map(({ from, to }, i) => {
                  const c1 = COMPONENTS[from];
                  const c2 = COMPONENTS[to];
                  const isActive =
                    activeNodes.includes(from) || activeNodes.includes(to);
                  const isDeployed =
                    deployedNodes.has(from) && deployedNodes.has(to);
                  return (
                    <line
                      key={i}
                      x1={c1.x * 6}
                      y1={c1.y * 4.5 + 18}
                      x2={c2.x * 6}
                      y2={c2.y * 4.5 - 18}
                      stroke={
                        isActive
                          ? TIER_COLORS[c2.tier]
                          : isDeployed
                          ? `${TIER_COLORS[c2.tier]}60`
                          : "#1E3A5F40"
                      }
                      strokeWidth={isActive ? 2 : 1}
                      strokeDasharray={isActive ? "6 3" : isDeployed ? "none" : "4 4"}
                      style={{ transition: "all 0.5s ease" }}
                    >
                      {isActive && (
                        <animate
                          attributeName="stroke-dashoffset"
                          values="18;0"
                          dur="1s"
                          repeatCount="indefinite"
                        />
                      )}
                    </line>
                  );
                })}

                {/* Nodes */}
                {COMPONENTS.map((comp, i) => (
                  <NodeComponent
                    key={i}
                    comp={comp}
                    index={i}
                    isActive={activeNodes.includes(i)}
                    isDeployed={deployedNodes.has(i)}
                    onHover={setTooltip}
                    activeTooltip={tooltip}
                  />
                ))}
              </svg>
            </div>

            {/* Deploy button */}
            <div className="mt-6 flex items-center gap-4">
              <button
                onClick={deploy}
                disabled={isAnimating}
                className="px-6 py-3 rounded-lg text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: isAnimating ? "#1E3A5F" : "#22D3EE",
                  color: isAnimating ? "#64748B" : "#0B1120",
                  boxShadow: isAnimating
                    ? "none"
                    : "0 0 30px rgba(34, 211, 238, 0.2)",
                }}
              >
                {isAnimating ? "Deploying..." : deployedNodes.size > 0 ? "Deploy Again" : "Deploy"}
              </button>
              {deployedNodes.size > 0 && !isAnimating && (
                <button
                  onClick={reset}
                  className="text-xs transition-colors"
                  style={{ color: "#475569" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#94A3B8")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
                >
                  Reset
                </button>
              )}
            </div>
          </motion.div>

          {/* Side panel */}
          <div className="lg:col-span-2">
            {/* Deploy progress */}
            <AnimatePresence mode="wait">
              {currentStep && (
                <motion.div
                  key={deployStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mb-8 p-4 rounded-lg border"
                  style={{
                    backgroundColor: "rgba(34, 211, 238, 0.05)",
                    borderColor: "rgba(34, 211, 238, 0.15)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{
                        backgroundColor: "#22D3EE",
                        color: "#0B1120",
                      }}
                    >
                      {deployStep + 1}
                    </div>
                    <span
                      className="text-sm font-medium"
                      style={{ color: "#22D3EE" }}
                    >
                      {currentStep.label}
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: "#64748B" }}>
                    {currentStep.desc}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tier legend */}
            <div>
              <p
                className="text-xs uppercase tracking-[0.2em] mb-4"
                style={{ color: "#334155" }}
              >
                Architecture
              </p>
              <div className="space-y-4">
                {[1, 2, 3].map((tier) => (
                  <motion.div
                    key={tier}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: tier * 0.1 }}
                    className="flex gap-3"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{
                        backgroundColor: `${TIER_COLORS[tier]}15`,
                        border: `1px solid ${TIER_COLORS[tier]}30`,
                        color: TIER_COLORS[tier],
                      }}
                    >
                      {tier}
                    </div>
                    <div>
                      <p
                        className="text-sm font-medium"
                        style={{ color: TIER_COLORS[tier] }}
                      >
                        {TIER_LABELS[tier]}
                      </p>
                      <p className="text-xs" style={{ color: "#475569" }}>
                        {TIER_DESCS[tier]}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Stack tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8"
            >
              <p
                className="text-xs uppercase tracking-[0.2em] mb-3"
                style={{ color: "#334155" }}
              >
                Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "EKS",
                  "Argo CD",
                  "Argo Rollouts",
                  "Kyverno",
                  "Terraform",
                  "Helm",
                  "GitOps",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-md border"
                    style={{
                      backgroundColor: "rgba(34, 211, 238, 0.05)",
                      borderColor: "rgba(34, 211, 238, 0.15)",
                      color: "#64748B",
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
