/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FAF8F5',
          50: '#FBF9F6',
          100: '#F5F3F0',
          200: '#EFEEEB',
          300: '#EAE8E5',
          400: '#E4E2DF',
        },
        carbon: {
          DEFAULT: '#111111',
          900: '#0D0D0D',
          800: '#1C1B1B',
          700: '#222222',
          600: '#30312F',
        },
        ginger: {
          DEFAULT: '#DDA24C',
          light: '#F3C079',
          dark: '#B88232',
        },
        blush: {
          DEFAULT: '#F4D9D2',
          light: '#FDF5F7',
          dark: '#E2BCB3',
        },
        border: {
          hairline: '#E5E0DA',
          hairlineDark: '#222222',
        },
        mint: {
          bg: '#EAF7F2',
          text: '#1E6548',
          border: '#C1E7D7',
        },
        shoppay: '#5A31F4',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Didot', 'Bodoni MT', 'serif'],
        mono: ['"Space Mono"', 'monospace'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'tightest': '-0.04em',
        'wider-label': '0.12em',
        'widest-spec': '0.18em',
      },
      borderWidth: {
        'hairline': '1px',
      }
    },
  },
  plugins: [],
}
