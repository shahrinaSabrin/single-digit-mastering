/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { backgroundImage: theme => ({
        'url': "url('./public/Images/Abacus-000493-1-Kid-Lifestyle.webp')",
          'progress-url': "url('./public/Images/report-icon_8276-254.avif')",
           'abacus-url': "url('./public/Images/abacus-1.avif')",
      })},
  },
   plugins: [],
}