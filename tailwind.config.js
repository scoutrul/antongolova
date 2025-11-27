/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#d5d168", // главный бренд-цвет
          light: "#e4e29a", // hover на светлом фоне
          dark: "#b8b350", // active / текст на светлом
        },
        secondary: {
          DEFAULT: "#5c80c2", // поддерживающий
          light: "#7da2e2",
          dark: "#4264a2",
        },
        black: {
          10: "#303030",
          50: "#5c5c5c",
          70: "#cdcdcd",
          90: "#090909",
          "90-alpha": "#c95c5f1a",
        },
        white: {
          80: "#dedede",
          90: "#f6f6f5",
          100: "#ffffff",
          "90-alpha": "#ffffff1a",
        },
      },
      fontFamily: {
        sans: [
          "Neue Montreal",
          "TT Neoris Trial",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      fontSize: {
        h1: ["180px", { lineHeight: "0.9", fontWeight: "500" }], // 90% line-height
        h2: ["100px", { lineHeight: "0.95", fontWeight: "500" }], // 95% line-height
        h3: ["64px", { lineHeight: "1", fontWeight: "500" }], // 100% line-height
        h4: ["46px", { lineHeight: "1", fontWeight: "500" }], // 100% line-height
        h5: ["28px", { lineHeight: "1.2", fontWeight: "500" }], // 120% line-height
        p1: ["20px", { lineHeight: "1.4", fontWeight: "400" }], // 140% line-height
        p2: ["16px", { lineHeight: "1.6", fontWeight: "400" }], // 160% line-height
        p3: ["14px", { lineHeight: "1.8", fontWeight: "400" }], // 180% line-height
      },
      borderRadius: {
        card: "12px",
        button: "8px",
      },
      boxShadow: {
        card: "0 4px 20px rgba(0, 0, 0, 0.08)",
        button: "0 2px 8px rgba(66, 149, 18, 0.2)",
        "button-hover": "0 4px 12px rgba(66, 149, 18, 0.3)",
      },
    },
  },
  plugins: [],
};
