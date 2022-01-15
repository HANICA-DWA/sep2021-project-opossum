function axecoreAnnotationMapper(violations) {
  // Axe Core does not use WCAG2.1! So we cannot use their rules in our annotation model...
  // https://github.com/dequelabs/axe-core/blob/master/doc/rule-descriptions.md

  const annotations = []

  violations.forEach((v) => {
    v.nodes.forEach((n) => {
      annotations.push({
        title: v.help,
        description: v.description,
        selector: n.target,
        labels: [n.impact, 'Auto Analysis'],
        draft: true,
      })
    })
  })

  return annotations
}

const button1 = document.getElementById('button1')
button1.addEventListener('click', async function () {
  const iframe = document.getElementById('iframe')

  const violations = await iframe.contentWindow.analyse()
  const annotations = axecoreAnnotationMapper(violations)

  annotations.forEach((el) => console.log(el))
  alert('Check console for result! (Ctrl+Shift+K)')
})
