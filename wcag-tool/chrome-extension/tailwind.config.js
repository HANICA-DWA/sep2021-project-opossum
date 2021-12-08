module.exports = {
  purge: ['./src/**/*.html', './src/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        'poppins-semi': ['Poppins-Semi', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['responsive', 'hover', 'focus', 'active', 'disabled'],
      backgroundOpacity: ['responsive', 'hover', 'focus', 'active', 'disabled'],
      textOpacity: ['responsive', 'hover', 'focus', 'active', 'disabled'],
      visibility: ['responsive', 'hover', 'focus', 'active', 'disabled'],
    },
  },
  plugins: [],
}
