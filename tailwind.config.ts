import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          900: "#0E1B33",
          700: "#1B3A5C",
          500: "#3A5F8A",
          100: "#E5ECF4",
        },
        cream: {
          50: "#FAF7F2",
          100: "#F4EFE6",
          200: "#E8DFCE",
        },
        coral: {
          500: "#E8927C",
          400: "#F0AB97",
          100: "#FBE5DD",
        },
        olive: {
          600: "#6B7A4F",
          100: "#E8ECDA",
        },
        amber: {
          500: "#D4A24C",
          100: "#FBF1DD",
        },
        gred: {
          500: "#C84B3F",
          100: "#F8E1DE",
        },
        ink: {
          primary: "#1A1F2B",
          secondary: "#4A5468",
          tertiary: "#7B8499",
        },
      },
      fontFamily: {
        // Fraunces via next/font (latin) with a plain Fraunces fallback that
        // carries Greek glyphs from Google Fonts (see app/layout.tsx).
        display: ["var(--font-fraunces)", "Fraunces", "ui-serif", "Georgia", "serif"],
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        // [size, { lineHeight, letterSpacing, fontWeight }]
        display: ["3rem", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "500" }],
        h1: ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.015em", fontWeight: "500" }],
        h2: ["1.75rem", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "500" }],
        h3: ["1.375rem", { lineHeight: "1.3", fontWeight: "600" }],
        "body-lg": ["1.0625rem", { lineHeight: "1.6", fontWeight: "400" }],
        body: ["0.9375rem", { lineHeight: "1.55", fontWeight: "400" }],
        small: ["0.8125rem", { lineHeight: "1.5", fontWeight: "500" }],
        micro: ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.06em", fontWeight: "600" }],
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(14, 27, 51, 0.04), 0 1px 1px rgba(14, 27, 51, 0.03)",
        md: "0 4px 12px rgba(14, 27, 51, 0.06), 0 2px 4px rgba(14, 27, 51, 0.04)",
        lg: "0 12px 32px rgba(14, 27, 51, 0.10), 0 4px 8px rgba(14, 27, 51, 0.05)",
        widget: "0 20px 60px rgba(14, 27, 51, 0.18)",
        focus: "0 0 0 3px #E5ECF4",
      },
      ringColor: {
        DEFAULT: "#3A5F8A",
      },
      keyframes: {
        pulseSoft: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(27, 58, 92, 0.35)" },
          "50%": { boxShadow: "0 0 0 12px rgba(27, 58, 92, 0)" },
        },
      },
      animation: {
        "pulse-soft": "pulseSoft 2.4s ease-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
