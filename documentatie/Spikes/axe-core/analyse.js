axe.configure({
  allowedOrigins: ['<unsafe_all_origins>'],
})

function analyse() {
  axe
    .run()
    .then((results) => {
      console.log(results.violations)
    })
    .catch((err) => {
      console.error('Something bad happened:', err)
    })
}
