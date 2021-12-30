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

export function timeSince(date) {
  date = new Date(date)
  const seconds = Math.floor((new Date() - date) / 1000)

  let interval = seconds / 31536000

  if (interval > 1) {
    return `${Math.floor(interval)}y ago`
  }
  interval = seconds / 2592000
  if (interval > 1) {
    return `${Math.floor(interval)}m ago`
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
