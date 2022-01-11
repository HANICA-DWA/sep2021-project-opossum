import { useEffect, useState } from 'react'

export const useOptions = () => {
  const [options, setOptions] = useState({ username: '', sideBySide: false })

  useEffect(() => {
    chrome.storage.sync.get(['options'], (result) => {
      if (result.options) setOptions(result.options)
    })

    chrome.storage.onChanged.addListener((changes) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const [key, { newValue }] of Object.entries(changes)) {
        if (key === 'options') {
          setOptions(newValue)
        }
      }
    })

    return () => {
      chrome.storage.onChanged.removeListener()
    }
  }, [])

  return options
}
