/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeSlideDown: "fadeSlideDown 0.3s ease-out forwards",
      },
      keyframes: {
        fadeSlideDown: {
          '0%': { opacity: 0, transform: 'translateY(-10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      colors: {
        apple: {
          DEFAULT: '#91B844',
          100: '#1d240d',
          200: '#3a491b',
          300: '#566d28',
          400: '#739236',
          500: '#91b844',
          600: '#a7c767',
          700: '#bdd58d',
          800: '#d3e3b3',
          900: '#e9f1d9'
        },
        asparagus: {
          DEFAULT: '#569A47',
          100: '#111f0e',
          200: '#223d1c',
          300: '#345c2a',
          400: '#457b39',
          500: '#569a47',
          600: '#72b762',
          700: '#95c98a',
          800: '#b8dbb1',
          900: '#dcedd8'
        },
        brunswick: {
          DEFAULT: '#054B3A',
          100: '#010f0c',
          200: '#021f18',
          300: '#032e23',
          400: '#043d2f',
          500: '#054b3a',
          600: '#0a9d78',
          700: '#0feeb6',
          800: '#5ef5cf',
          900: '#aefae7'
        },
        blue: {
          DEFAULT: '#0484BF',
          100: '#011a26',
          200: '#02344c',
          300: '#024f72',
          400: '#036998',
          500: '#0484bf',
          600: '#07adfa',
          700: '#45c2fb',
          800: '#83d6fc',
          900: '#c1ebfe'
        }
      }
    }
  },
  plugins: [],
}
