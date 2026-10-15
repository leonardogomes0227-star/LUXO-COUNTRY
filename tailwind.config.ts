import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        carvao: "#0E0C0A",
        creme: "#F4EDE0",
        couro: "#5A3A26",
        caramelo: "#B07A45",
        ouro: "#C9A15B",
        turquesa: "#3F8F8A",
        terra: "#9C4A2B",
        sol: "#E9A85A",
      },
      fontFamily: {
        display: ['"Fraunces Variable"', "Georgia", "serif"],
        sans: ['"Inter Variable"', "system-ui", "sans-serif"],
        script: ['"Great Vibes"', "cursive"],
        rye: ["Rye", "serif"],
      },
      keyframes: {
        shine: { "0%": { transform: "translateX(-120%)" }, "60%,100%": { transform: "translateX(120%)" } },
        pulseRing: { "0%": { transform: "scale(1)", opacity: ".5" }, "100%": { transform: "scale(1.6)", opacity: "0" } },
      },
      animation: {
        shine: "shine 3.4s ease-in-out infinite",
        pulseRing: "pulseRing 2.6s ease-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
