import React from 'react'

export default function DropdownOption({ labelName, id, options, value, onChange }) {
  return (
    <>
      <label className="block font-poppins text-gray-700 text-sm font-bold mb-1" htmlFor={id}>
        {labelName}
      </label>
      <div className="grid grid-cols-2 -ml-2">
        <select
          onChange={(e) => {
            onChange(id, e.target.value)
          }}
          id={id}
          value={value}
          className="block w-52 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          name="language"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.language}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}
