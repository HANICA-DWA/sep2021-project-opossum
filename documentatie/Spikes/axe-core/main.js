const button1 = document.getElementById('button1')
button1.addEventListener('click', async function () {
  const iframe = document.getElementById('iframe')
  const result = await iframe.contentWindow.analyse()
  console.log(result)
  alert('Check console for result! (Ctrl+Shift+K)')
})
