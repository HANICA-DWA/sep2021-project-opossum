import React from 'react'
import { useState } from 'react'

const Alert = ({ title, message, color, action }) => {
  return (
    <div
      className={`bg-${color}-100 border-l-4 border-${color}-700 text-${color}-700 p-3 mb-0.5 flex justify-between`}
      role="alert"
      onClick={() => setShow(false)}
    >
      <div>
        <p className="font-bold">{title}</p>
        <p>{message}</p>
      </div>
      {action && (
        <button
          type="button"
          className={`py-1 px-3 border-${color}-400 bg-${color}-700 hover:bg-${color}-800 text-gray-100  rounded-lg focus:border-4`}
          onClick={action.method}
          disabled={action.disabled}
        >
          {action.name}
        </button>
      )}
    </div>
  )
}

export default Alert
