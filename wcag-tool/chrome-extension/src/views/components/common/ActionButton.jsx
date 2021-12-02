import React from 'react'

const ActionButton = function ({ children, onClick, type }) {
  return (
    <button
      type={type}
      className="py-1 px-5 text-lg rounded-lg focus:border-4 border-green-400 bg-green-700 text-gray-100 hover:bg-green-900"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default ActionButton
