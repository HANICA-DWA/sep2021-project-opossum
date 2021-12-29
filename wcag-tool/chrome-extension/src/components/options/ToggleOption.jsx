import React from 'react'
import { Icon } from '../common/Icon'

export default function ToggleOption({ value, labelName, infoTitle, id, onChange }) {
  return (
    <div className="block font-poppins my-2 text-gray-700 text-sm font-bold mb-1">
      {labelName}
      {infoTitle && <Icon title={infoTitle} name="information-circle" className="inline" />}
      <div className="mb-3">
        <div className="relative inline-block w-10 mr-2 align-middle select-none">
          <input
            type="checkbox"
            name="toggle"
            checked={value}
            onChange={(e) => {
              onChange(id, e.target.checked)
            }}
            id={id}
            className="checked:bg-blue-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-gray-500 border-4 appearance-none cursor-pointer"
          />
          <label
            htmlFor={id}
            className="block overflow-hidden h-6 rounded-full bg-gray-600 cursor-pointer"
          />
        </div>
      </div>
    </div>
  )
}
