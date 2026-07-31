import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#080808",
        "bg-secondary": "#111111",
        "bg-elevated": "#1A1A1A",
        "text-primary": "#FFFFFF",
        "text-secondary": "#A0A0A0",
        "text-muted": "#555555",
        accent: "#FFFFFF",
        "accent-subtle": "#222222",
        border: "#2A2A2A",
        grid: "#1E1E1E",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      spacing: {
        xs: "8px",
        sm: "16px",
        md: "24px",
        lg: "40px",
        xl: "64px",
        "2xl": "96px",
        "3xl": "128px",
      },
      letterSpacing: {
        tightest: "-0.05em",
        tighter: "-0.03em",
        display: "-0.02em",
        eyebrow: "0.12em",
        button: "0.04em",
      },
      maxWidth: {
        content: "1320px",
      },
    },
  },
  plugins: [],
};
export default config;
