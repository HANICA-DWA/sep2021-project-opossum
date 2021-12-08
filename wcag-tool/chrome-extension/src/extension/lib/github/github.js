

/* global fetch, btoa, AbortController */

export { pushGitHub }

let pendingPush

async function pushGitHub(token, userName, repositoryName, branchName, path, content) {
  while (pendingPush) {
    await pendingPush
  }
  const controller = new AbortController()
  pendingPush = (async () => {
    try {
      await createContent({ path, content }, controller.signal)
    } finally {
      pendingPush = null
    }
  })()
  return {
    cancelPush: () => controller.abort(),
    pushPromise: pendingPush,
  }

  async function createContent({ path, content, message = '' }, signal) {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${userName}/${repositoryName}/contents/${path.replace(
          /#/g,
          '%23'
        )}`,
        {
          method: 'PUT',
          headers: new Map([
            ['Authorization', `token ${token}`],
            ['Accept', 'application/vnd.github.v3+json'],
          ]),
          body: JSON.stringify({
            content: btoa(unescape(encodeURIComponent(content))),
            message,
            branch: branchName,
          }),
          signal,
        }
      )
      const responseData = await response.json()
      if (response.status < 400) {
        return responseData
      }
      throw new Error(responseData.message)
    } catch (error) {
      if (error.name != 'AbortError') {
        throw error
      }
    }
  }
}
