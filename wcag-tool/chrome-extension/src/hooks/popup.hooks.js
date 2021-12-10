export const useGetSnapshotCreationProgress = async () => {
  const result = await browser.runtime.sendMessage({
    method: 'downloads.getInfo',
  })
  console.log('result', result)
  return result.length > 0
}
