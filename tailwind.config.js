module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        black: '#000',
        white: '#fff',
        primary: {
          DEFAULT: '#005A64',
          muted: '#71A2A8',
          light: '#C2D8DA',
          lighter: '#D4E4E6',
          dark: '#003940',
        },
        secondary: {
          DEFAULT: '#00ACB2',
          light: '#87E4DB',
        },
        highlight: '#CBF0C1',
        skin: {
          muted: '#FAFCFC',
          DEFAULT: '#E5EEEF',
        },
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'robotoSlab': ['Roboto Slab', 'serif'],
        'roboto': ['Roboto', 'sans-serif'],
        'noto': ['Noto Sans'],
        'alegreya': ['Alegreya Sans SC', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
