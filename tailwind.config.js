/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        english: ["Outfit", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
        farsi: ["Nazanin"],
        arabic: ["UsmanTaha"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@vueform/slider/tailwind")],
};
