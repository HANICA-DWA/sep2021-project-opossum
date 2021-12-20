// const axe = require('axe-core')

const iframeDocument = document.getElementById('iframeWrapper').contentWindow.document.querySelectorAll('*')

axe.configure({
  allowedOrigins: ['<unsafe_all_origins>'],
})

axe
  .run(iframeDocument)
  .then((results) => {
    console.log(results.violations)
  })
  .catch((err) => {
    console.error('Something bad happened:', err)
  })
