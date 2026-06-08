import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        vellum: "#fbf6ed",
        parchment: "#f3ead9",
        ink: "#2a211c",
        maroon: "#7b1f2f",
        gold: "#b8842f",
        olive: "#6f6a3c"
      },
      fontFamily: {
        tamilSerif: ["var(--font-tamil-serif)", "serif"],
        tamilSans: ["var(--font-tamil-sans)", "sans-serif"]
      },
      boxShadow: {
        soft: "0 24px 70px rgba(42, 33, 28, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
