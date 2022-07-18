/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        english: ["Calibri"],
        farsi: ["B Nazanin"],
        arabic: ["Usman_Taha"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
