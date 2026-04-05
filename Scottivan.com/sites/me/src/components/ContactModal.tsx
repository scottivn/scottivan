"use client";

import { useState, useEffect, useRef } from "react";

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
    "w-full bg-[#0a0e1a] border border-[#1f2937] rounded px-4 py-3 text-sm text-white font-mono placeholder:text-[#4b5563] focus:outline-none focus:border-[#00ff88]/50 focus:ring-1 focus:ring-[#00ff88]/20 transition-colors";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg rounded-lg border border-[#00ff88]/20 bg-[#0d1117] p-8 shadow-[0_0_40px_rgba(0,255,136,0.05)]">
        {/* Terminal title bar */}
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#1f2937]">
          <div className="flex gap-1.5">
            <button onClick={onClose} className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110" aria-label="Close" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="font-mono text-xs text-[#4b5563] ml-2">~/contact</span>
        </div>

        {status === "sent" ? (
          <div className="text-center py-8">
            <p className="font-mono text-sm text-[#00ff88] glow-green mb-2">$ message sent ✓</p>
            <p className="font-mono text-sm text-[#94a3b8]">
              I&apos;ll get back to you within 24 hours.
            </p>
            <button
              onClick={onClose}
              className="mt-6 font-mono text-sm px-6 py-2.5 rounded border border-[#1f2937] text-[#94a3b8] hover:text-white hover:border-[#00ff88]/30 transition-all"
            >
              close
            </button>
          </div>
        ) : (
          <>
            <p className="font-mono text-xs text-[#4b5563] mb-1">$ cat contact_form.md</p>
            <h3 className="font-mono text-lg text-white font-bold mb-1">
              <span className="text-[#00ff88] glow-green">get_in_touch</span>()
            </h3>
            <p className="font-mono text-sm text-[#94a3b8] mb-6">
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
                className="w-full font-mono text-sm px-5 py-3 bg-[#00ff88] text-[#0a0e1a] rounded font-bold hover:bg-[#00ff88]/90 transition-all hover:shadow-[0_0_20px_rgba(0,255,136,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "sending" ? "sending..." : "send_message()"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
