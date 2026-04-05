"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FORMSPREE_URL = "https://formspree.io/f/xykblgpy";

const SERVICE_OPTIONS = [
  "New Website",
  "Website Redesign",
  "Custom Web Application",
  "Other",
];

export default function ContactModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      // Reset form state when modal closes
      const timer = setTimeout(() => setStatus("idle"), 300);
      return () => clearTimeout(timer);
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        formRef.current?.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full bg-portal-surface border border-portal-border rounded-lg px-4 py-3 text-sm text-portal-text placeholder:text-portal-muted focus:outline-none focus:border-portal-accent/50 focus:ring-1 focus:ring-portal-accent/20 transition-colors";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg rounded-2xl border border-portal-border bg-portal-bg p-8 shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-portal-muted hover:text-portal-text transition-colors"
              aria-label="Close"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 5l10 10M15 5L5 15" />
              </svg>
            </button>

            {status === "sent" ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-portal-accent/10 flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-portal-text mb-2">Message sent</h3>
                <p className="text-portal-dim text-sm">
                  I&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 font-sans text-sm px-6 py-2.5 rounded-lg border border-portal-border text-portal-dim hover:text-portal-text hover:border-portal-muted transition-all"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <p className="font-mono text-xs tracking-[0.2em] uppercase text-portal-accent mb-2">
                  Get in touch
                </p>
                <h3 className="text-2xl font-bold text-portal-text mb-1">
                  Let&apos;s build something
                </h3>
                <p className="text-portal-dim text-sm mb-6">
                  Tell me about your project and I&apos;ll get back to you within 24 hours.
                </p>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name *"
                      required
                      className={inputClass}
                    />
                    <input
                      type="text"
                      name="business"
                      placeholder="Business name"
                      className={inputClass}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email *"
                      required
                      className={inputClass}
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone (optional)"
                      className={inputClass}
                    />
                  </div>

                  <select
                    name="service"
                    required
                    defaultValue=""
                    className={`${inputClass} appearance-none`}
                  >
                    <option value="" disabled>
                      What are you looking for? *
                    </option>
                    {SERVICE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>

                  <textarea
                    name="message"
                    placeholder="Tell me a bit about your project..."
                    rows={4}
                    className={`${inputClass} resize-none`}
                  />

                  {/* Honeypot */}
                  <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

                  {status === "error" && (
                    <p className="text-red-400 text-sm">Something went wrong. Try again or email directly.</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full font-sans text-sm px-5 py-3 bg-portal-accent text-portal-bg rounded-lg font-semibold hover:bg-portal-accent/90 transition-all hover:shadow-[0_0_20px_rgba(0,255,136,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "sending" ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
