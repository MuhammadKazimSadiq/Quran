/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        english: ["Calibri"],
        farsi: ["Nazanin"],
        arabic: ["UsmanTaha"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@vueform/slider/tailwind")],
};
