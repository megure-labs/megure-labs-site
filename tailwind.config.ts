import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        rice: {
          50: "#FDFCFA",
          100: "#F8F6F1",
          200: "#F1EEE8",
          300: "#E4DFD7",
        },
        ink: {
          500: "#526579",
          700: "#29445F",
          800: "#16324E",
          900: "#0B2035",
          950: "#071522",
        },
        nami: {
          400: "#4DD8FF",
          500: "#2F74D0",
          600: "#1E58AE",
        },
        fuji: {
          400: "#B06CE0",
          500: "#9B5FC2",
          600: "#7B3F9E",
        },
      },
      fontFamily: {
        sans: ['"M PLUS 2"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
