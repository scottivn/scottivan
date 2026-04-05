"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import models from "../../../../../models.json";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function ModelsPage() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
        <Link href="/" className="font-sans text-sm tracking-wider text-portal-dim hover:text-portal-text transition-colors">
          scottivan.com
        </Link>
        <div className="flex items-center gap-6">
          <a
            href="https://me.scottivan.com"
            className="font-sans text-sm text-portal-dim hover:text-portal-text transition-colors"
          >
            about
          </a>
          <a
            href="mailto:hello@scottivan.com"
            className="font-sans text-sm px-4 py-2 rounded-full border border-portal-muted text-portal-dim hover:border-portal-accent hover:text-portal-accent transition-all"
          >
            contact
          </a>
        </div>
      </nav>

      {/* Header */}
      <section className="px-6 pt-12 pb-16 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-portal-accent mb-4">
            Live Demos
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-portal-text mb-4 tracking-tight">
            Website Models
          </h1>
          <p className="text-portal-dim text-lg max-w-2xl leading-relaxed">
            Fully functional website demos built on the same stack I use for clients.
            Pick a starting point — I&apos;ll tailor it to your business.
          </p>
        </motion.div>
      </section>

      {/* Models grid */}
      <section className="px-6 pb-24 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          {models.map((model, i) => {
            const isLive = model.status === "live";
            const domain = `${model.slug}.scottivan.com`;

            return (
              <motion.div
                key={model.slug}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="card-glow rounded-2xl border border-portal-border bg-portal-surface/50 overflow-hidden flex flex-col"
              >
                {/* Preview area */}
                <div className="h-48 bg-portal-bg flex items-center justify-center border-b border-portal-border">
                  <span className="font-mono text-xs text-portal-muted">
                    {isLive ? domain : "coming soon"}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h2 className="text-lg font-bold text-portal-text">{model.name}</h2>
                    <span
                      className="font-mono text-xs px-2 py-0.5 rounded-full"
                      style={
                        isLive
                          ? { background: "rgba(0,255,136,0.1)", color: "#00ff88", border: "1px solid rgba(0,255,136,0.2)" }
                          : { background: "rgba(64,64,64,0.2)", color: "#737373", border: "1px solid rgba(64,64,64,0.3)" }
                      }
                    >
                      {isLive ? "live" : "coming soon"}
                    </span>
                  </div>

                  <p className="text-portal-dim text-sm leading-relaxed mb-4 flex-1">
                    {model.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {model.bestFor.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-xs px-2.5 py-1 rounded-full bg-portal-border text-portal-dim"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {isLive ? (
                    <a
                      href={`https://${domain}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans text-sm px-5 py-2.5 bg-portal-accent text-portal-bg rounded-lg font-semibold text-center hover:bg-portal-accent/90 transition-all hover:shadow-[0_0_20px_rgba(0,255,136,0.2)]"
                    >
                      View Live Demo
                    </a>
                  ) : (
                    <span className="font-sans text-sm px-5 py-2.5 border border-portal-border text-portal-muted rounded-lg text-center cursor-default">
                      Coming Soon
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="card-glow rounded-2xl border border-portal-border bg-portal-surface/50 p-12"
        >
          <h2 className="text-2xl font-bold text-portal-text mb-3">Need something custom?</h2>
          <p className="text-portal-dim text-sm mb-8 max-w-md mx-auto leading-relaxed">
            These are starting points. I&apos;ll build a tailored site for your business —
            your brand, your content, your domain.
          </p>
          <a
            href="mailto:hello@scottivan.com"
            className="inline-block font-sans text-sm px-8 py-3 bg-portal-accent text-portal-bg rounded-lg font-semibold hover:bg-portal-accent/90 transition-all hover:shadow-[0_0_20px_rgba(0,255,136,0.2)]"
          >
            Get Started
          </a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center border-t border-portal-border">
        <div className="flex items-center justify-center gap-6">
          <Link href="/" className="font-sans text-xs text-portal-muted hover:text-portal-dim transition-colors">
            Home
          </Link>
          <a href="https://me.scottivan.com" className="font-sans text-xs text-portal-muted hover:text-portal-dim transition-colors">
            About
          </a>
          <a href="mailto:hello@scottivan.com" className="font-sans text-xs text-portal-muted hover:text-portal-dim transition-colors">
            Contact
          </a>
        </div>
        <p className="font-sans text-xs text-portal-muted mt-4">
          &copy; {new Date().getFullYear()} Scott Ivan
        </p>
      </footer>
    </div>
  );
}
