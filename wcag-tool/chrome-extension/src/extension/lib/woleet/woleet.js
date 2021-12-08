
/* global fetch */
const urlService = 'https://api.woleet.io/v1/anchor'
const apiKey = ''
export { anchor }
async function anchor(hash, userKey) {
  const bearer = userKey || apiKey
  const response = await fetch(urlService, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${bearer}`,
    },
    body: JSON.stringify({
      name: hash,
      hash,
      public: true,
    }),
  })
  if (response.status == 401) {
    const error = new Error(
      'Your access token on Woleet is invalid. Go to __DOC_LINK__ to create your account.'
    )
    error.link = 'https://app.woleet.io/'
    throw error
  } else if (response.status == 402) {
    const error = new Error(
      'You have no more credits on Woleet. Go to __DOC_LINK__ to recharge them.'
    )
    error.link = 'https://app.woleet.io/'
    throw error
  } else if (response.status >= 400) {
    throw new Error(`${response.statusText || `Error ${response.status}`} (Woleet)`)
  }
  return response.json()
}
