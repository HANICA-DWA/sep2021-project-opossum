import React, { useEffect, useState } from 'react'
import { Icon } from '../common/Icon'
import TextOption from './TextOption'
import ToggleOption from './ToggleOption'

const OptionsForm = function () {
  const [options, setOptions] = useState({ username: '', sideBySide: true })
  const [saved, setSaved] = useState(false)

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
        infoTitle="When activated enables the menu to be side-by-side with the page snapshot. Deactivate to have the menu slide over the page snapshot."
        id="sideBySide"
        value={options.sideBySide}
        onChange={handleChange}
      />

      <div className="flex justify-center">
        <button
          disabled={!options.username || saved}
          onClick={saveOptions}
          type="button"
          className={`py-1 px-4 inline-grid grid-flow-col grid-cols-2  ${
            saved ? 'bg-green-600 cursor-default' : 'bg-blue-600 hover:bg-blue-700 '
          } text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg`}
        >
          <Icon
            name={`${!saved ? 'save' : 'check'}`}
            type="outline"
            className="inline"
            size={6}
            viewBox="0 0 24 24"
          />

          {saved ? 'Saved' : 'Save'}
        </button>
      </div>
    </div>
  )
}

export default OptionsForm
