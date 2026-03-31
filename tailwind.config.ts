import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#103B8C",
          orange: "#FF8A1F",
          green: "#18A957",
          surface: "#F5F7FB",
          ink: "#14213D",
          muted: "#6B7280",
          danger: "#DC2626"
        }
      },
      fontFamily: {
        sans: ["Inter", "Poppins", "ui-sans-serif", "system-ui"]
      },
      boxShadow: {
        soft: "0 14px 40px rgba(16, 59, 140, 0.08)",
        game: "0 20px 40px rgba(255, 138, 31, 0.14)"
      },
      backgroundImage: {
        hero: "radial-gradient(circle at top left, rgba(16,59,140,0.12), transparent 38%), radial-gradient(circle at bottom right, rgba(24,169,87,0.12), transparent 35%), linear-gradient(180deg, #ffffff 0%, #f5f7fb 100%)"
      }
    }
  },
  plugins: []
};

export default config;
