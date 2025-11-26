/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Цветовая палитра Goevo из макета Figma (актуальная дизайн-система)
        primary: {
          DEFAULT: '#429512',
          hover: '#4fa61d',
          active: '#3b870e',
        },
        secondary: {
          DEFAULT: '#e2ff83',
        },
        black: {
          10: '#303030',       // Текст ответов FAQ
          50: '#5c5c5c',       // Серый вторичный текст
          70: '#cdcdcd',       // Border для Secondary кнопок
          90: '#161616',       // Темный фон
          '90-alpha': '#232323cc', // Black-90 с прозрачностью 80%
        },
        white: {
          80: '#dedede',       // White-80
          90: '#f6f6f5',       // Светлый фон/текст
          100: '#ffffff',      // Чисто белый
          '90-alpha': '#ffffffcc', // White-90 с прозрачностью 80%
        },
      },
      fontFamily: {
        sans: ['Neue Montreal', 'TT Neoris Trial', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        // Типографическая система из макета Figma (Font: Neue Montreal)
        'h1': ['180px', { lineHeight: '0.9', fontWeight: '500' }],    // 90% line-height
        'h2': ['100px', { lineHeight: '0.95', fontWeight: '500' }],   // 95% line-height
        'h3': ['64px', { lineHeight: '1', fontWeight: '500' }],       // 100% line-height
        'h4': ['46px', { lineHeight: '1', fontWeight: '500' }],       // 100% line-height
        'h5': ['28px', { lineHeight: '1.2', fontWeight: '500' }],     // 120% line-height
        'p1': ['20px', { lineHeight: '1.4', fontWeight: '400' }],     // 140% line-height
        'p2': ['16px', { lineHeight: '1.6', fontWeight: '400' }],     // 160% line-height
        'p3': ['14px', { lineHeight: '1.8', fontWeight: '400' }],     // 180% line-height
      },
      spacing: {
        '18': '72px',
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'button': '0 2px 8px rgba(66, 149, 18, 0.2)',
        'button-hover': '0 4px 12px rgba(66, 149, 18, 0.3)',
      },
    },
  },
  plugins: [],
}

