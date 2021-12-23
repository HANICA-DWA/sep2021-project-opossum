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
