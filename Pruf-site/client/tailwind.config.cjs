/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: '#1D4ED8',
        'brand-dark': '#1E40AF',
      },
    },
  },
  plugins: [],
}
