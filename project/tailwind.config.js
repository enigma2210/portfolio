/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'gow-black': '#0b0b0e',
        'gow-near-black': '#121217',
        'gow-deep-gray': '#1b1c22',
        'gow-ember': '#d43f2f',
        'gow-molten': '#ff6a3d',
        'gow-aurora': '#4fb0ff',
        'gow-icy': '#9fd9ff',
        'gow-gold': '#dab56a',
        'gow-silver': '#b7beca',
      },
      backgroundImage: {
        'ember-forge': 'linear-gradient(45deg, #d43f2f, #ff6a3d)',
        'aurora-veil': 'linear-gradient(90deg, #4fb0ff, #9fd9ff)',
        'nightfall': 'radial-gradient(circle, #0b0b0e, #1b1c22)',
      },
      animation: {
        'rune-rotate': 'runeRotate 120s linear infinite',
        'serpent-emerge': 'serpentEmerge 8s ease-in-out forwards',
        'guide-breath': 'guideBreath 4s ease-in-out infinite',
        'cape-flutter': 'capeFlutter 3s ease-in-out infinite',
        'relic-float': 'relicFloat 3s ease-in-out infinite',
        'forge-strike': 'forgeStrike 0.8s ease-out',
        'raven-flight': 'ravenFlight 3s ease-in-out forwards',
        'pillar-glow': 'pillarGlow 2s ease-in-out infinite',
      },
      keyframes: {
        runeRotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        serpentEmerge: {
          '0%': { opacity: '0', transform: 'translateX(-100%) scale(0.8)' },
          '50%': { opacity: '1', transform: 'translateX(0) scale(1)' },
          '100%': { opacity: '0', transform: 'translateX(100%) scale(0.8)' },
        },
        guideBreath: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        },
        capeFlutter: {
          '0%, 100%': { transform: 'skewX(0deg)' },
          '50%': { transform: 'skewX(2deg)' },
        },
        relicFloat: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(2deg)' },
        },
        forgeStrike: {
          '0%': { transform: 'scale(1)', filter: 'brightness(1)' },
          '50%': { transform: 'scale(1.2)', filter: 'brightness(2)' },
          '100%': { transform: 'scale(1)', filter: 'brightness(1)' },
        },
        ravenFlight: {
          '0%': { transform: 'translateX(0) translateY(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateX(200vw) translateY(-100vh) rotate(20deg)', opacity: '0' },
        },
        pillarGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(218, 181, 106, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(218, 181, 106, 0.6)' },
        },
      },
    },
  },
  plugins: [],
};
