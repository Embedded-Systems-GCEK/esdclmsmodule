/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#020617', // slate-950
          card: 'rgba(15,23,42,0.88)', // glass card
          soft: 'rgba(15,23,42,0.7)',
        },
        primary: {
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        },
        accent: {
          400: '#a855f7',
          500: '#7c3aed',
        },
      },
      boxShadow: {
        glow: '0 0 30px rgba(45,212,191,0.35)',
        'inner-glow': '0 0 20px rgba(56,189,248,0.35) inset',
      },
      backgroundImage: {
        'grid-circuit':
          'radial-gradient(circle at 1px 1px, rgba(148,163,184,0.18) 1px, transparent 0)',
      },
      backgroundSize: {
        'grid-circuit': '40px 40px',
      },
      animation: {
        'float-slow': 'float 18s linear infinite',
        'orb-slow': 'orb 26s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(-20px, 15px, 0)' },
          '100%': { transform: 'translate3d(0,0,0)' },
        },
        orb: {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(40px,-30px,0) scale(1.2)' },
        },
      },
    },
  },
  plugins: [],
};
