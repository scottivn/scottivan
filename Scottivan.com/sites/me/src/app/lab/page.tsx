"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import LabNav from "@/components/lab/LabNav";

const BJJSection = dynamic(() => import("@/components/lab/BJJSection"), {
  loading: () => <SectionSkeleton />,
});
const ChessSection = dynamic(() => import("@/components/lab/ChessSection"), {
  loading: () => <SectionSkeleton />,
  ssr: false,
});
const K8sSection = dynamic(() => import("@/components/lab/K8sSection"), {
  loading: () => <SectionSkeleton />,
});
const InvestingCoda = dynamic(
  () => import("@/components/lab/InvestingCoda"),
  { loading: () => <div className="h-40" /> }
);

function SectionSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-zinc-700 border-t-zinc-400 rounded-full animate-spin" />
    </div>
  );
}

export default function LabPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 relative" style={{ backgroundColor: "#09090B" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <h1
            className="text-5xl md:text-7xl font-light tracking-tight mb-6"
            style={{ color: "#FAFAFA" }}
          >
            Lab
          </h1>
          <p
            className="text-sm md:text-base max-w-md mx-auto leading-relaxed"
            style={{ color: "#71717A" }}
          >
            The things I do when I&apos;m not deploying clusters.
            Jiu-jitsu, chess, and the systems I build.
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          onClick={() =>
            document
              .getElementById("bjj")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="absolute bottom-12 text-zinc-600 hover:text-zinc-400 transition-colors"
          aria-label="Scroll down"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={24} />
          </motion.div>
        </motion.button>
      </section>

      {/* Sections */}
      <BJJSection />
      <ChessSection />
      <K8sSection />
      <InvestingCoda />

      {/* Floating nav */}
      <LabNav />

      {/* Footer */}
      <footer
        className="border-t py-10 px-6 text-center"
        style={{ backgroundColor: "#09090B", borderColor: "#27272A" }}
      >
        <p
          className="text-xs"
          style={{ color: "#3F3F46" }}
        >
          Built with Next.js · Deployed on AWS · © {new Date().getFullYear()} Scott Ivan
        </p>
      </footer>
    </main>
  );
}
