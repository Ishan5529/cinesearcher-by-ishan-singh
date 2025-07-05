module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar-hide'),
  ],
}
