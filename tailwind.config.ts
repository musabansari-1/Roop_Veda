import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        sand: "#F6EBDD",
        ember: "#E86A33",
        forest: "#19332D",
        gold: "#F6B26B",
        mist: "#EEF4F1",
        ink: "#1A1A1A"
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)"],
        display: ["var(--font-fraunces)"]
      },
      boxShadow: {
        glow: "0 20px 60px rgba(232, 106, 51, 0.25)"
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(circle at top left, rgba(246, 178, 107, 0.28), transparent 30%), radial-gradient(circle at bottom right, rgba(25, 51, 45, 0.18), transparent 38%)"
      }
    }
  },
  plugins: []
};

export default config;
