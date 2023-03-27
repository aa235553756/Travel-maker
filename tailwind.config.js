module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '16px',
        md: '58px',
        lg: '76px',
        xl: '156px'
      },
      fontFamily: {
        'sans': ['Noto Sans', 'Noto Sans TC', 'sans-serif'],
        'serif': ['sans-serif']
      }
    },
    screens: {
      'sm': '428px',
      // => @media (min-width: 428px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1280px',
      // => @media (min-width: 1280px) { ... }

      'xl': '1440px'
      // => @media (min-width: 1440px) { ... }

    },
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/bannerBg.png')",
        'footer-texture': "url('/img/footer-texture.png')",
      },
      colors: {
        primary: '#439F8E',
        secondary: '#317468',
        thirdry: '#737373',
        glass: {
          default: 'rgba(255,255,255,0.8)',
          45: 'rgba(255,255,255,0.45)'
        }
        // button text 9F9F9F
        // TypeLabel text 797979
      }
    },
  },
  plugins: [],
}