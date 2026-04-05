import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/shared/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FAFAF7",
        ink: "#141414",
        body: "#555555",
        rule: "#E5E2DD",
        warm: "#F5F2ED",
        accent: "#E8552D",
        "accent-hover": "#D14A24",
        "accent-soft": "#FFF0EB",
        "dark-surface": "#111111",
        "dark-body": "#A0A0A0",
        "dark-rule": "#2A2A2A",
      },
      fontFamily: {
        serif: ["Georgia", "Times New Roman", "serif"],
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        "section": "0.15em",
      },
    },
  },
  plugins: [],
};

export default config;
