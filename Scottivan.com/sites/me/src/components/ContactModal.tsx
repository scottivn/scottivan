"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

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
      const timer = setTimeout(() => setStatus("idle"), 300);
      return () => clearTimeout(timer);
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

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

  if (!open) return null;

  const inputClass =
    "w-full bg-[#09090B] border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white font-mono placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-colors";

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg rounded-2xl border border-zinc-800 bg-[#141416] p-8 shadow-[0_0_60px_rgba(0,0,0,0.5)]">
        {/* Terminal title bar */}
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-zinc-800">
          <div className="flex gap-1.5">
            <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500/80 hover:brightness-110" aria-label="Close" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="font-mono text-xs text-zinc-600 ml-2">contact</span>
        </div>

        {status === "sent" ? (
          <div className="text-center py-8">
            <p className="font-mono text-sm text-emerald-400 glow-green mb-2">Message sent ✓</p>
            <p className="font-mono text-sm text-zinc-400">
              I&apos;ll get back to you within 24 hours.
            </p>
            <button
              onClick={onClose}
              className="mt-6 font-mono text-sm px-6 py-2.5 rounded-lg border border-zinc-700 text-zinc-400 hover:text-white hover:border-amber-500/30 transition-all"
            >
              close
            </button>
          </div>
        ) : (
          <>
            <h3 className="font-display text-xl text-white font-bold mb-1">
              Get in Touch
            </h3>
            <p className="text-sm text-zinc-400 mb-6">
              Tell me about your project.
            </p>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" name="name" placeholder="name *" required className={inputClass} />
                <input type="text" name="business" placeholder="business" className={inputClass} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input type="email" name="email" placeholder="email *" required className={inputClass} />
                <input type="tel" name="phone" placeholder="phone" className={inputClass} />
              </div>

              <select name="service" required defaultValue="" className={`${inputClass} appearance-none`}>
                <option value="" disabled>what are you looking for? *</option>
                {SERVICE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt.toLowerCase()}</option>
                ))}
              </select>

              <textarea
                name="message"
                placeholder="tell me about your project..."
                rows={4}
                className={`${inputClass} resize-none`}
              />

              <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

              {status === "error" && (
                <p className="font-mono text-sm text-red-400">error: something went wrong. try again.</p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full text-sm px-5 py-3 bg-amber-500 text-zinc-950 rounded-lg font-semibold hover:bg-amber-400 transition-all hover:shadow-[0_0_25px_rgba(232,168,48,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
