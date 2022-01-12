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

export function timeSince(date, t) {
  date = new Date(date)
  const seconds = Math.floor((new Date() - date) / 1000)

  let interval = seconds / 31536000

  if (interval > 1) {
    return t('Y_AGO', {
      time: Math.floor(interval),
    })
  }
  interval = seconds / 604800
  if (interval > 1) {
    return t('W_AGO', {
      time: Math.floor(interval),
    })
  }
  interval = seconds / 86400
  if (interval > 1) {
    return t('D_AGO', {
      time: Math.floor(interval),
    })
  }
  interval = seconds / 3600
  if (interval > 1) {
    return t('H_AGO', {
      time: Math.floor(interval),
    })
  }
  interval = seconds / 60
  if (interval > 1) {
    return t('M_AGO', {
      time: Math.floor(interval),
    })
  }
  if (seconds < 30) {
    return t('NOW')
  }

  return t('S_AGO', {
    time: Math.floor(interval),
  })
}
