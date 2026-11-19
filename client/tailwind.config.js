/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        sage: { DEFAULT: '#DCE8D5', soft: '#EAF1E5' },
        butter: '#F8F0CE',
        warm: '#FFFDF7',
        cream: '#F4F0E5',
        olive: { DEFAULT: '#59664D', deep: '#4B573F' },
        charcoal: { DEFAULT: '#41443D', soft: '#5E6158' },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      borderRadius: { soft: '1.25rem' },
      letterSpacing: { label: '0.22em' },
      transitionTimingFunction: { lux: 'cubic-bezier(0.22, 1, 0.36, 1)' },
    },
  },
  plugins: [],
};
