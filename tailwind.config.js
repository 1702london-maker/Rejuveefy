/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pink: {
          50:  '#FFF0F5',
          100: '#FCE4EC',
          200: '#F8BBD0',
          300: '#F48FB1',
          400: '#F06292',
          500: '#E91E63',
          600: '#D81B60',
          700: '#C2185B',
          800: '#AD1457',
          900: '#880E4F',
        },
        brand: '#E91E63',
        'brand-dark': '#C2185B',
        'brand-light': '#FCE4EC',
        'brand-soft': '#FFF0F5',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 8px rgba(0,0,0,0.07)',
        modal: '0 8px 32px rgba(0,0,0,0.13)',
        pink: '0 4px 20px rgba(233,30,99,0.18)',
      },
    },
  },
  plugins: [],
}
