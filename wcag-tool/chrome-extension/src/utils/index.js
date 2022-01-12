export function stripHtml(html) {
  return html?.replace(/<(?:.|\n)*?>/gm, '')
}

export const formatCreatedAtString = (createdAt) => {
  const dateObject = new Date(createdAt)

  return [
    dateObject.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
    dateObject.toLocaleTimeString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
  ]
}

export function axecoreAnnotationMapper(violations) {
  // Axe Core does not use WCAG2.1! So we cannot use their successcriteria in our annotation model...
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

export function timeSince(date) {
  date = new Date(date)
  const seconds = Math.floor((new Date() - date) / 1000)

  let interval = seconds / 31536000

  if (interval > 1) {
    return `${Math.floor(interval)}y ago`
  }
  interval = seconds / 604800
  if (interval > 1) {
    return `${Math.floor(interval)}w ago`
  }
  interval = seconds / 86400
  if (interval > 1) {
    return `${Math.floor(interval)}d ago`
  }
  interval = seconds / 3600
  if (interval > 1) {
    return `${Math.floor(interval)}h ago`
  }
  interval = seconds / 60
  if (interval > 1) {
    return `${Math.floor(interval)}m ago`
  }
  if (seconds < 30) {
    return 'just now'
  }

  return `${Math.floor(seconds)}s ago`
}
