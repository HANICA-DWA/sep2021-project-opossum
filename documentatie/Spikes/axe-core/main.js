const button1 = document.getElementById('button1')
button1.addEventListener('click', function () {
  const iframe = document.getElementById('iframe')
  iframe.contentWindow.analyse()
})
