"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const BELT_COLORS: Record<string, string> = {
  white: "#e2e8f0",
  blue: "#2563eb",
  purple: "#7c3aed",
  brown: "#78350f",
  black: "#111827",
};

interface Milestone {
  belt: string;
  year: string;
  label: string;
  detail: string;
}

const milestones: Milestone[] = [
  {
    belt: "white",
    year: "2019",
    label: "White Belt",
    detail: "Started training at Rodrigo Pinheiro BJJ. Fell in love with the art from day one.",
  },
  {
    belt: "blue",
    year: "2020",
    label: "Blue Belt",
    detail: "Promoted after a year of consistent training. Started developing a guard-passing game.",
  },
  {
    belt: "purple",
    year: "2023",
    label: "Purple Belt",
    detail: "Current rank. Focusing on leg locks, back control, and refining submissions.",
  },
];

const focuses = [
  { label: "Guard Passing", desc: "Torreando, over-under, knee slice" },
  { label: "Leg Locks", desc: "Heel hooks, kneebars, calf slicers" },
  { label: "Back Control", desc: "Seat belt grip, bow & arrow, RNC" },
];

interface Video {
  youtubeId: string;
  title: string;
  opponent: string;
  event: string;
  date: string;
}

const videos: Video[] = [];

function BeltBar({ belt, isCurrent }: { belt: string; isCurrent: boolean }) {
  const color = BELT_COLORS[belt] || BELT_COLORS.white;
  return (
    <div
      className="h-3 rounded-full flex-1 relative overflow-hidden"
      style={{
        backgroundColor: color,
        boxShadow: isCurrent ? `0 0 20px ${color}40` : "none",
      }}
    >
      <div className="absolute right-0 top-0 bottom-0 w-4 bg-black/70 rounded-r-full" />
    </div>
  );
}

function MilestoneCard({
  milestone,
  index,
  isActive,
  onClick,
}: {
  milestone: Milestone;
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const color = BELT_COLORS[milestone.belt];
  const isCurrent = index === milestones.length - 1;

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="text-left w-full group"
    >
      <div className="flex items-center gap-4 mb-3">
        <div
          className="w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
          style={{
            borderColor: color,
            backgroundColor: isActive ? `${color}20` : "transparent",
          }}
        >
          <span className="text-xs font-medium" style={{ color }}>
            {milestone.year}
          </span>
        </div>
        <div className="flex-1">
          <BeltBar belt={milestone.belt} isCurrent={isCurrent} />
        </div>
      </div>

      <h4
        className="text-sm font-medium mb-1 transition-colors"
        style={{ color: isActive ? color : "#E8E0D4" }}
      >
        {milestone.label}
      </h4>

      <motion.div
        initial={false}
        animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="text-sm leading-relaxed" style={{ color: "#8C7B6B" }}>
          {milestone.detail}
        </p>
      </motion.div>
    </motion.button>
  );
}

export default function BJJSection() {
  const [activeMilestone, setActiveMilestone] = useState(milestones.length - 1);

  return (
    <section
      id="bjj"
      className="min-h-screen relative overflow-hidden flex items-center"
      style={{ backgroundColor: "#141210" }}
    >
      {/* Faded gym logo background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-[600px] h-[600px] md:w-[800px] md:h-[800px] opacity-[0.04]">
          <Image
            src="/pinheiro-logo.webp"
            alt=""
            fill
            className="object-contain"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-24 md:py-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <p
            className="text-xs uppercase tracking-[0.25em] mb-4"
            style={{ color: "#D4740A" }}
          >
            Brazilian Jiu-Jitsu
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-6"
            style={{ color: "#E8E0D4", fontFamily: "'DM Sans', sans-serif" }}
          >
            The Gentle Art
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
            <p className="text-sm" style={{ color: "#8C7B6B" }}>
              Training under{" "}
              <span style={{ color: "#D4740A" }}>Professor Manuel Ribamar</span>
            </p>
            <span className="hidden sm:block w-1 h-1 rounded-full" style={{ backgroundColor: "#8C7B6B" }} />
            <p className="text-sm" style={{ color: "#8C7B6B" }}>
              <span style={{ color: "#E8A830" }}>Rodrigo Pinheiro BJJ</span>
              {" "}— Boerne, TX
            </p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Belt Journey */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs uppercase tracking-[0.2em] mb-8"
              style={{ color: "#6B5E52" }}
            >
              Belt Journey
            </motion.p>
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <MilestoneCard
                  key={m.belt}
                  milestone={m}
                  index={i}
                  isActive={activeMilestone === i}
                  onClick={() => setActiveMilestone(i)}
                />
              ))}
            </div>
          </div>

          {/* Current Focus */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs uppercase tracking-[0.2em] mb-8"
              style={{ color: "#6B5E52" }}
            >
              Current Focus
            </motion.p>
            <div className="space-y-6">
              {focuses.map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="border-l-2 pl-5 py-1"
                  style={{ borderColor: "#D4740A" }}
                >
                  <h4 className="text-sm font-medium mb-1" style={{ color: "#E8E0D4" }}>
                    {f.label}
                  </h4>
                  <p className="text-xs" style={{ color: "#8C7B6B" }}>
                    {f.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Current rank highlight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-12 p-6 rounded-2xl border"
              style={{
                backgroundColor: "rgba(124, 58, 237, 0.05)",
                borderColor: "rgba(124, 58, 237, 0.15)",
              }}
            >
              <div className="flex items-center gap-4 mb-3">
                <div
                  className="w-14 h-4 rounded-full"
                  style={{
                    backgroundColor: "#7c3aed",
                    boxShadow: "0 0 20px rgba(124, 58, 237, 0.3)",
                  }}
                />
                <div>
                  <p className="text-sm font-medium" style={{ color: "#7c3aed" }}>
                    Purple Belt
                  </p>
                  <p className="text-xs" style={{ color: "#6B5E52" }}>
                    Promoted 2023
                  </p>
                </div>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "#8C7B6B" }}>
                The purple belt is where creativity meets technique. Building my own
                game rather than just surviving.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20"
        >
          <p
            className="text-xs uppercase tracking-[0.2em] mb-8"
            style={{ color: "#6B5E52" }}
          >
            Match Film
          </p>
          {videos.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-6">
              {videos.map((v) => (
                <div
                  key={v.youtubeId}
                  className="rounded-xl overflow-hidden border"
                  style={{ borderColor: "rgba(212, 116, 10, 0.15)" }}
                >
                  <div className="aspect-video relative">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}`}
                      title={v.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                  <div className="p-4" style={{ backgroundColor: "#1a1714" }}>
                    <p className="text-sm font-medium" style={{ color: "#E8E0D4" }}>
                      {v.title}
                    </p>
                    <p className="text-xs mt-1" style={{ color: "#6B5E52" }}>
                      vs. {v.opponent} — {v.event} · {v.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="rounded-2xl border border-dashed p-12 text-center"
              style={{ borderColor: "rgba(212, 116, 10, 0.2)" }}
            >
              <div className="text-3xl mb-4 opacity-30">🎬</div>
              <p className="text-sm" style={{ color: "#6B5E52" }}>
                Match compilations coming soon
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
