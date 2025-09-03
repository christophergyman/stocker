/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cream': '#FFFCE2',
        'beige': '#CCC5B9',
        'charcoal': '#403D39',
        'dark': '#252422',
        'terracotta': '#EB5E28',
      },
    },
  },
  plugins: [],
}
