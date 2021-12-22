export function truncateStringAndCapitalize(num, str = '') {
  const newString = str.charAt(0).toUpperCase() + str.slice(1)

  if (newString.length <= num) {
    return newString
  }

  return `${str.slice(0, num)}...`
}

export function stripHtml(html) {
  return html?.replace(/<(?:.|\n)*?>/gm, '')
}

export function axecoreAnnotationMapper(violations) {
  // Axe Core does not use WCAG2.1! So we cannot use their rules in our annotation model...
  // https://github.com/dequelabs/axe-core/blob/master/doc/rule-descriptions.md

  const annotations = []

  violations.forEach((v) => {
    v.nodes.forEach((n) => {
      annotations.push({
        title: v.help,
        description: v.description,
        selector: n.target[0],
        labels: [n.impact, 'auto analysis', 'draft'],
      })
    })
  })

  return annotations
}
