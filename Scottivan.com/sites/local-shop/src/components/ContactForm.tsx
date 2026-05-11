"use client";

import { useState, type FormEvent } from "react";
import { Send, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xykblgpy";

const SUBJECTS = [
  { value: "general", label: "General question" },
  { value: "wholesale", label: "Wholesale inquiry" },
  { value: "catering", label: "Catering / events" },
  { value: "press", label: "Press" },
  { value: "feedback", label: "Feedback" },
] as const;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-success/40 bg-success-soft px-6 py-8 text-center">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-success text-on-accent mb-4">
          <Check className="h-5 w-5" aria-hidden />
        </div>
        <h2 className="font-display text-h2 text-ink mb-2">Thanks — we got it.</h2>
        <p className="text-small text-ink-2 max-w-md mx-auto">
          We read every message. Most replies go out within a business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Honeypot */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px]"
        aria-hidden
      />

      <div className="grid sm:grid-cols-2 gap-5">
        <Field
          label="Your name"
          name="name"
          required
          autoComplete="name"
        />
        <Field
          label="Email"
          name="email"
          type="email"
          required
          autoComplete="email"
        />
      </div>

      <Field label="Phone (optional)" name="phone" type="tel" autoComplete="tel" />

      <label className="block">
        <span className="eyebrow block mb-2">Reason for reaching out</span>
        <select
          name="subject"
          required
          defaultValue="general"
          className={cn(
            "block w-full h-11 rounded-md border border-rule bg-surface px-3 text-base text-ink",
            "focus:outline-none focus:border-rule-strong focus:shadow-focus transition-colors duration-fast",
          )}
        >
          {SUBJECTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="eyebrow block mb-2">Message</span>
        <textarea
          name="message"
          required
          rows={6}
          placeholder="Tell us a little about what you're hoping to get from us."
          className={cn(
            "block w-full rounded-md border border-rule bg-surface px-3 py-3 text-base text-ink placeholder:text-ink-3 resize-y",
            "focus:outline-none focus:border-rule-strong focus:shadow-focus transition-colors duration-fast",
          )}
        />
      </label>

      {status === "error" ? (
        <div
          role="alert"
          className="rounded-md border border-danger/40 bg-danger-soft px-4 py-3 text-small text-danger"
        >
          {errorMessage ?? "Something went wrong. Please try again."}
        </div>
      ) : null}

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
        <Button
          type="submit"
          size="lg"
          loading={status === "submitting"}
          className="sm:min-w-[200px]"
        >
          {status === "submitting" ? "Sending…" : "Send message"}
          {status !== "submitting" ? (
            <Send className="h-4 w-4" aria-hidden />
          ) : null}
        </Button>
        <p className="font-mono text-mono-tag text-ink-3">
          Typical reply: within one business day.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="eyebrow block mb-2">
        {label}
        {required ? <span className="text-accent ml-1">·</span> : null}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        className={cn(
          "block w-full h-11 rounded-md border border-rule bg-surface px-3 text-base text-ink placeholder:text-ink-3",
          "focus:outline-none focus:border-rule-strong focus:shadow-focus transition-colors duration-fast",
        )}
      />
    </label>
  );
}
