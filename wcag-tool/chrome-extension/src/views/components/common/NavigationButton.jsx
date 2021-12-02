import React from 'react'

const DefaultButton = function ({ children, onClick, disabled, className }) {
  const styles = {
    undefined: 'bg-gray-300 text-black hover:bg-gray-400',
    false: 'bg-gray-300 text-black hover:bg-gray-400',
    true: 'bg-gray-400 cursor-not-allowed text-white',
  }
  return (
    <button
      type="button"
      disabled={disabled}
      className={`p-2 px-4 text-lg ${className} ${styles[disabled]}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default DefaultButton
