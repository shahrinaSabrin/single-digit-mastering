/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { backgroundImage: theme => ({
        'url': "url('./public/Images/Abacus-000493-1-Kid-Lifestyle.webp')",
      })},
  },
   plugins: [],
}