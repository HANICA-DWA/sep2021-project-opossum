module.exports = {
  purge: ['./src/**/*.html', './src/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    stroke: {
      current: 'currentColor',
    },
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        'poppins-semi': ['Poppins-Semi', 'sans-serif'],
      },
      colors: {
        'lime-400': '#a3e635',
        'orange-400': '#fb923c',
      },
    },
  },
  variants: {
    extend: {
      borderColor: ['checked'],
      inset: ['checked'],
      backgroundColor: ['responsive', 'checked', 'hover', 'focus', 'active', 'disabled'],
      opacity: ['responsive', 'hover', 'focus', 'active', 'disabled'],
      cursor: ['responsive', 'hover', 'focus', 'active', 'disabled'],
      color: ['responsive', 'hover', 'focus', 'active', 'disabled'],
    },
  },
  plugins: [],
}
