/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'ubuntu': ['Ubuntu', 'sans-serif'],
      },
      screens: {
        'tiny': '425px',
        'mdd': '800px',
        'lgg': '1200px',
      },
    },
  },
  plugins: [],
}