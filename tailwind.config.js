/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['B Nazanin'],
        'quran': ['Usman_Taha'],
      },
    },
  },
  plugins: [],
}
