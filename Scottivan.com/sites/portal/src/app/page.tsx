"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ContactModal from "../components/ContactModal";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Portal() {
  const [contactOpen, setContactOpen] = useState(false);
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!orbRef.current) return;
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      orbRef.current.style.background = `radial-gradient(600px circle at ${x}% ${y}%, rgba(0, 255, 136, 0.06), transparent 40%)`;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Mouse-follow gradient */}
      <div ref={orbRef} className="fixed inset-0 z-0 pointer-events-none transition-all duration-300" />

      {/* Ambient orbs */}
      <div className="orb orb-green w-[500px] h-[500px] -top-40 -right-40 fixed z-0 animate-pulse-slow" />
      <div className="orb orb-blue w-[400px] h-[400px] bottom-20 -left-32 fixed z-0 animate-pulse-slow" style={{ animationDelay: "2s" }} />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
        <span className="font-sans text-sm tracking-wider text-portal-dim">
          scottivan.com
        </span>
        <div className="flex items-center gap-6">
          <a
            href="https://me.scottivan.com"
            className="font-sans text-sm text-portal-dim hover:text-portal-text transition-colors"
          >
            about
          </a>
          <Link
            href="/models"
            className="font-sans text-sm text-portal-dim hover:text-portal-text transition-colors"
          >
            models
          </Link>
          <button
            onClick={() => setContactOpen(true)}
            className="font-sans text-sm px-4 py-2 rounded-full border border-portal-muted text-portal-dim hover:border-portal-accent hover:text-portal-accent transition-all"
          >
            contact
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex-1 flex flex-col justify-center items-center px-6 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-mono text-xs tracking-[0.3em] uppercase text-portal-accent mb-8"
          >
            Engineer &middot; Builder &middot; Creator
          </motion.p>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-6xl md:text-8xl font-bold leading-[0.95] tracking-tight mb-8"
          >
            <span className="text-portal-text">Scott</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-portal-accent via-portal-blue to-portal-accent bg-[length:200%_auto] animate-gradient-shift">
              Ivan
            </span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-lg md:text-xl text-portal-dim max-w-2xl mx-auto leading-relaxed mb-16 font-light"
          >
            I build platforms at enterprise scale and craft custom websites for
            businesses that want to stand out. Explore my world.
          </motion.p>

          {/* Two paths */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto"
          >
            {/* Personal */}
            <a
              href="https://me.scottivan.com"
              className="card-glow group relative rounded-2xl border border-portal-border bg-portal-surface/50 backdrop-blur p-8 text-left transition-all duration-300 hover:border-portal-muted hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-portal-accent/10 flex items-center justify-center">
                  <span className="font-mono text-portal-accent text-sm">&gt;_</span>
                </div>
                <span className="font-mono text-xs text-portal-muted tracking-wider uppercase">
                  Personal
                </span>
              </div>
              <h2 className="text-2xl font-bold text-portal-text mb-2 group-hover:text-portal-accent transition-colors">
                About Me
              </h2>
              <p className="text-portal-dim text-sm leading-relaxed mb-6">
                Platform engineer at USAA. Kubernetes, DevSecOps, and cloud-native architecture.
                CKA certified. Cornell ML. Chess, BJJ, and side projects.
              </p>
              <span className="font-mono text-xs text-portal-accent opacity-0 group-hover:opacity-100 transition-opacity">
                me.scottivan.com →
              </span>
            </a>

            {/* Business */}
            <Link
              href="/models"
              className="card-glow group relative rounded-2xl border border-portal-border bg-portal-surface/50 backdrop-blur p-8 text-left transition-all duration-300 hover:border-portal-muted hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-portal-blue/10 flex items-center justify-center">
                  <span className="font-mono text-portal-blue text-sm">{"{ }"}</span>
                </div>
                <span className="font-mono text-xs text-portal-muted tracking-wider uppercase">
                  Business
                </span>
              </div>
              <h2 className="text-2xl font-bold text-portal-text mb-2 group-hover:text-portal-blue transition-colors">
                Website Models
              </h2>
              <p className="text-portal-dim text-sm leading-relaxed mb-6">
                Live demos of custom websites I build for businesses. Same professional stack,
                tailored to your brand. Browse, pick, and let me build yours.
              </p>
              <span className="font-mono text-xs text-portal-blue opacity-0 group-hover:opacity-100 transition-opacity">
                explore models →
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 text-center">
        <p className="font-sans text-xs text-portal-muted">
          &copy; {new Date().getFullYear()} Scott Ivan &middot; Built with Next.js &middot; Deployed on AWS
        </p>
      </footer>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
