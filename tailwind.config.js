module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '16px',
        md: '58px',
        lg: '76px',
        xl: '156px',
      },
      fontFamily: {
        sans: ['Noto Sans', 'Noto Sans TC', 'sans-serif'],
        serif: ['sans-serif'],
      },
    },
    screens: {
      sm: '428px',
      // => @media (min-width: 428px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1280px',
      // => @media (min-width: 1280px) { ... }

      xl: '1440px',
      // => @media (min-width: 1440px) { ... }
    },
    extend: {
      backgroundImage: {
        banner: "url('/bannerBg.jpg')",
        'footer-texture': "url('/img/footer-texture.png')",
      },
      colors: {
        primary: { DEFAULT: '#439F8E', dark: '#317468', tint: '#48BDA7' },
        secondary: '#F8D34F',
        highlight: '#C91D1D',
        glass: {
          DEFAULT: 'rgba(255,255,255,0.8)',
          45: 'rgba(255,255,255,0.45)',
        },
        gray: {
          '64': '#646464',
          '73': '#737373',
          'A8': '#A8A4A4',
          'B8': '#B8B8B8',
          'D9': '#D9D9D9',
          'E7': '#E7E7E7',
          'F3': '#F3F2F0',
          'F4': '#F4F4F4',
          'E2': '#E2E2E2',
          'E9': '#E9E9E9',
          'FA': '#FAFAFA',
        },
        // 這裡搜集著所有重複的未知顏色...
        // 首頁 請選擇行程 9F9F9F
        // TypeLabel城市走走 797979
        // 首頁 放鬆療癒 4B673B
      },
      keyframes: {
        'fade': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'fade-out': {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        'fade-in-out': {
          '0%': { opacity: 0 },
          '50%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        'navbar-hover': {
          '0%': { top: '-16px', opacity: '0' },
          '100%': { top: '0px', opacity: '1' }
        },

      },
      animation: {
        'fade': 'fade 150ms ease-in-out',
        'fade-in-out': 'fade-out 500ms ease-in-out',
        'fade-out': 'fade-out 150ms ease-in-out',
        'navbar-hover': 'navbar-hover 500ms ease-in-out ',

      },
    },
  },
  plugins: [],
}
