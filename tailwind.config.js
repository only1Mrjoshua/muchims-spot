// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#FCF0CF',
          100: '#F9E19E',
          200: '#F6D16E',
          300: '#F3C23D',
          500: '#F0B30D',
          600: '#C08F0A',
          700: '#906B08',
          900: '#604805',
        },
        'off-white': '#FDFBF6',
        'charcoal': '#1A1A1A',
        'dark-gray': '#4A4A4A',
        'light-gray': '#E5E5E5',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}