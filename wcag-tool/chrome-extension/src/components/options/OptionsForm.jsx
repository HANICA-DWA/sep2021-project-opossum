import React, { useEffect, useState } from 'react'
import DefaultButton from '../common/DefaultButton'
import { Icon } from '../common/Icon'
import TextOption from './TextOption'
import ToggleOption from './ToggleOption'

const OptionsForm = function () {
  const [options, setOptions] = useState({ username: '', sideBySide: false })
  const [saved, setSaved] = useState(true)

  useEffect(() => {
    chrome.storage.sync.get(['options'], (result) => {
      setOptions((prevState) => ({ ...prevState, ...result.options }))
    })
  }, [])

  const saveOptions = () => {
    chrome.storage.sync.set(
      {
        options,
      },
      () => {
        setSaved(true)
      }
    )
  }

  const handleChange = (name, value) => {
    setOptions((prevState) => ({ ...prevState, [name]: value }))
    setSaved(false)
  }

  return (
    <div className="m-6">
      <h1 className="text-xl font-poppins mb-3">Options</h1>
      <TextOption
        value={options.username}
        id="username"
        labelName="Username"
        onChange={handleChange}
      />
      <ToggleOption
        labelName="Editor side-by-side"
        infoTitle="When activated enables the sliding editor to be side-by-side with the snapshot.
        By default the editor slides over the page."
        id="sideBySide"
        value={options.sideBySide}
        onChange={handleChange}
      />

      <div className="flex justify-center">
        <DefaultButton disabled={!options.username || saved} onClick={saveOptions} type="button">
          <Icon
            name={`${!saved ? 'save' : 'check'}`}
            type="outline"
            className="inline mx-2"
            size={6}
            viewBox={24}
          />

          {saved ? 'Saved' : 'Save'}
        </DefaultButton>
      </div>
    </div>
  )
}

export default OptionsForm
