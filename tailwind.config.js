/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'bg-[#FA7AA5]',
    'bg-[#FFDC60]',
    'bg-[#1AB6BD]',
    'bg-[#00B0FF]',
    'bg-[#A737FF]',
    'bg-[#DFBBFE]',
    'bg-[#767580]',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}