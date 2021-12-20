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
