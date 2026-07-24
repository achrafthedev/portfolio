/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        void: {
          950: '#020408',
          900: '#060918',
          800: '#0c1030',
          700: '#12173f',
        },
        neon: {
          cyan: '#22d3ee',
          violet: '#a78bfa',
          indigo: '#818cf8',
          amber: '#fbbf24',
          pink: '#f472b6',
          green: '#34d399',
        },
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(34, 211, 238, 0.45)',
        'glow-violet': '0 0 40px -8px rgba(167, 139, 250, 0.45)',
      },
      backgroundImage: {
        'radial-fade': 'radial-gradient(ellipse at 30% 20%, #0c1030 0%, #060918 60%, #020408 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
