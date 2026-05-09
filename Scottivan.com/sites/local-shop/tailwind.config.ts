import type { Config } from "tailwindcss";

/**
 * Field & Larder — Tailwind config
 *
 * Every value here either consumes a CSS variable from src/styles/tokens.css
 * (so it responds to data-theme="dark") or maps 1:1 to the brief's spec.
 *
 * Naming conventions match the design tokens for parity:
 *   bg-bg          → var(--color-bg-primary)
 *   text-ink       → var(--color-text-primary)
 *   text-ink-2     → var(--color-text-secondary)
 *   border-rule    → var(--color-border-primary)
 *   bg-accent      → var(--color-accent-primary)
 */
const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/shared/src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg-primary)",
        surface: "var(--color-bg-secondary)",
        "surface-2": "var(--color-bg-tertiary)",
        "bg-inverse": "var(--color-bg-inverse)",
        overlay: "var(--color-bg-overlay)",

        ink: "var(--color-text-primary)",
        "ink-2": "var(--color-text-secondary)",
        "ink-3": "var(--color-text-tertiary)",
        "ink-inverse": "var(--color-text-inverse)",
        link: "var(--color-text-link)",
        "link-hover": "var(--color-text-link-hover)",

        rule: "var(--color-border-primary)",
        "rule-2": "var(--color-border-secondary)",
        "rule-strong": "var(--color-border-strong)",
        "focus-ring": "var(--color-border-focus)",

        accent: "var(--color-accent-primary)",
        "accent-hover": "var(--color-accent-primary-hover)",
        "accent-active": "var(--color-accent-primary-active)",
        "accent-soft": "var(--color-accent-soft)",
        "on-accent": "var(--color-accent-on-accent)",

        success: "var(--color-status-success)",
        "success-soft": "var(--color-status-success-soft)",
        warn: "var(--color-status-warning)",
        "warn-soft": "var(--color-status-warning-soft)",
        danger: "var(--color-status-error)",
        "danger-soft": "var(--color-status-error-soft)",
        info: "var(--color-status-info)",
        "info-soft": "var(--color-status-info-soft)",
      },
      fontFamily: {
        display: ["var(--font-family-display)"],
        sans: ["var(--font-family-body)"],
        mono: ["var(--font-family-mono)"],
      },
      fontSize: {
        eyebrow: ["var(--font-size-eyebrow)", { lineHeight: "1", letterSpacing: "0.12em" }],
        "mono-tag": ["var(--font-size-mono-tag)", { lineHeight: "1.2" }],
        small: ["var(--font-size-small)", { lineHeight: "1.45" }],
        base: ["var(--font-size-base)", { lineHeight: "1.5" }],
        md: ["var(--font-size-md)", { lineHeight: "1.5" }],
        h3: ["var(--font-size-h3)", { lineHeight: "1.3" }],
        h2: ["var(--font-size-h2)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        h1: ["var(--font-size-h1-fluid)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-2": ["var(--font-size-display-2-fluid)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-1": ["var(--font-size-display-1-fluid)", { lineHeight: "1.02", letterSpacing: "-0.025em" }],
      },
      fontWeight: {
        regular: "var(--font-weight-regular)",
        medium: "var(--font-weight-medium)",
        semibold: "var(--font-weight-semibold)",
        bold: "var(--font-weight-bold)",
      },
      letterSpacing: {
        tightest: "-0.025em",
        tight: "var(--letter-spacing-tight)",
        snug: "var(--letter-spacing-snug)",
        normal: "var(--letter-spacing-normal)",
        eyebrow: "var(--letter-spacing-eyebrow)",
      },
      spacing: {
        // Mirror the brief's 4-base scale alongside Tailwind defaults.
        section: "var(--space-section-y)",
        "section-loose": "var(--space-section-y-loose)",
        "section-tight": "var(--space-section-y-mobile)",
        gutter: "var(--container-gutter)",
      },
      maxWidth: {
        prose: "var(--max-width-content)",
        wide: "var(--max-width-wide)",
        page: "var(--max-width-page)",
      },
      borderRadius: {
        none: "var(--radius-none)",
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius-md)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        full: "var(--radius-full)",
      },
      boxShadow: {
        xs: "var(--shadow-xs)",
        sm: "var(--shadow-sm)",
        DEFAULT: "var(--shadow-md)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        focus: "var(--shadow-focus)",
      },
      transitionDuration: {
        instant: "var(--duration-instant)",
        fast: "var(--duration-fast)",
        normal: "var(--duration-normal)",
        slow: "var(--duration-slow)",
        slower: "var(--duration-slower)",
      },
      transitionTimingFunction: {
        DEFAULT: "var(--easing-default)",
        in: "var(--easing-in)",
        out: "var(--easing-out)",
        spring: "var(--easing-spring)",
      },
      zIndex: {
        base: "0",
        raised: "10",
        sticky: "50",
        overlay: "100",
        drawer: "200",
        modal: "300",
        toast: "400",
      },
      animation: {
        "fade-in": "fadeIn var(--duration-slow) var(--easing-out) forwards",
        "fade-up": "fadeUp var(--duration-slower) var(--easing-out) forwards",
        "slide-in-right": "slideInRight var(--duration-normal) var(--easing-out) forwards",
        "scale-pulse": "scalePulse var(--duration-fast) var(--easing-spring)",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        scalePulse: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.08)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
