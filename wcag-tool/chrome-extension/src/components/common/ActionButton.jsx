import React from 'react'

const ActionButton = function ({ children, onClick, type, disabled }) {
  const style = {
    submit: 'border-green-400 bg-green-700 text-gray-100 hover:bg-green-900',
    cancel: 'border-gray-400 bg-gray-700 text-gray-100 hover:bg-gray-800',
    disabled: 'border-gray-400 bg-gray-500 text-gray-400 cursor-default',
  }
  return (
    <button
      type={type}
      disabled={disabled}
      className={`py-1 px-5 text-lg rounded-lg focus:border-4 ${
        !disabled ? style[type] : style.disabled
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default ActionButton
