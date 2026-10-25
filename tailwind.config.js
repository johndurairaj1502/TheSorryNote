/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        kawaii: {
          pink: {
            50: '#FFF7F9',
            100: '#FFEBF1',
            200: '#FFD7E4',
            300: '#FFB8CF',
            400: '#FF85AC',
            500: '#FF5C8D',
            600: '#E6396E',
          },
          strawberry: '#FF4D79',
          cream: {
            50: '#FFFFFD',
            100: '#FFFDF9',
            200: '#FFF8F0',
            300: '#FFF0DE',
            400: '#FCE0C2',
          },
          peach: {
            100: '#FFF1EB',
            200: '#FFDFD3',
            300: '#FFC2AF',
            400: '#FFA085',
          },
          choco: {
            900: '#3D2014',
            800: '#542E1D',
            700: '#6D3D27',
            600: '#8A5136',
            500: '#A96848',
            400: '#C78564',
          },
          biscuit: '#E8B478',
          biscuitDark: '#C98F4E',
          matcha: '#D8EED2',
          lavender: '#EADCF7',
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-plus-jakarta)', 'Inter', 'system-ui', 'sans-serif'],
        handwriting: ['var(--font-caveat)', 'cursive'],
      },
      boxShadow: {
        'kawaii-sm': '0 4px 12px rgba(255, 133, 172, 0.18)',
        'kawaii': '0 10px 25px -4px rgba(255, 92, 141, 0.22), 0 4px 10px -2px rgba(84, 46, 29, 0.06)',
        'kawaii-lg': '0 20px 35px -6px rgba(255, 92, 141, 0.28), 0 8px 16px -4px rgba(84, 46, 29, 0.08)',
        'biscuit': '0 6px 0 #C98F4E, 0 10px 20px rgba(84, 46, 29, 0.15)',
      },
      animation: {
        'float-slow': 'floatSlow 5s ease-in-out infinite',
        'float-medium': 'floatMedium 3.8s ease-in-out infinite',
        'float-fast': 'floatFast 2.8s ease-in-out infinite',
        'wiggle': 'wiggle 1.2s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'bonk': 'bonk 0.4s ease-in-out',
        'sparkle': 'sparkle 2s ease-in-out infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(3deg)' },
        },
        floatMedium: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(-4deg)' },
        },
        floatFast: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-5px) rotate(2deg)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.06)' },
        },
        bonk: {
          '0%': { transform: 'rotate(0deg)' },
          '35%': { transform: 'rotate(-35deg) scale(1.15)' },
          '70%': { transform: 'rotate(15deg) scale(0.95)' },
          '100%': { transform: 'rotate(0deg) scale(1)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(0.8) rotate(0deg)' },
          '50%': { opacity: '1', transform: 'scale(1.15) rotate(180deg)' },
        },
      },
    },
  },
  plugins: [],
};
