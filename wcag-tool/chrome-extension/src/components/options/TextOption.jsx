import React from 'react'

export default function TextOption({ value, id, labelName, onChange }) {
  return (
    <>
      <label className="block font-poppins text-gray-700 text-sm font-bold mb-1" htmlFor={id}>
        {labelName}
      </label>
      <div className="grid grid-cols-2 -ml-2">
        <input
          className="shadow font-poppins appearance-none border border-gray-300 rounded-lg py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
          id={id}
          type="text"
          value={value}
          onChange={(e) => {
            onChange(id, e.target.value)
          }}
          placeholder="Username"
        />
      </div>
    </>
  )
}
