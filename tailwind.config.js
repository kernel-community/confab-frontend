module.exports = {
  // purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  purge: false,
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'transparent': 'transparent',
        'black': '#000',
        'white': '#fff',
        'kernel-purple': '#212144',
        'primary': {
          DEFAULT: '#005A64',
          muted: '#71A2A8',
          light: '#C2D8DA',
          lighter: '#D4E4E6',
          dark: '#003940',
        },
        'secondary': {
          DEFAULT: '#00ACB2',
          light: '#87E4DB',
        },
        'highlight': '#CBF0C1',
        'skin': {
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
        'heading': ['Nanum Myeongjo', 'serif'],
        'secondary': ['Futura'],
        'primary': ['Libre Franklin'],
      },
      fontSize: {
        'xxs': '0.69rem',
      },
      boxShadow: {
        'kernel': '0 30px 41px rgba(33, 33, 68, 0.24)',
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
