import React from 'react'

const ActionButton = function ({ children, onClick, type }) {
  const style = {
    submit: 'border-green-400 bg-green-700 text-gray-100 hover:bg-green-900',
    cancel: 'border-gray-400 bg-gray-700 text-gray-100 hover:bg-gray-900',
  }
  return (
    <button
      type={type}
      className={`py-1 px-5 text-lg rounded-lg focus:border-4 ${style[type]}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default ActionButton
