module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  important: true,
  applyComplexClasses: true,
  theme: {
    fontFamily: {
      sans: [
        'Open Sans',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'sans-serif',
      ],
    },
    extend: {
      colors: {
        'black-transparent': 'rgba(0, 0, 0, 0.6)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
