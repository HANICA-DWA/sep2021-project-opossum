import React from 'react'

const DefaultButton = function ({
  children,
  onClick,
  className,
}) {
  return (
    <button
      className={`px-4 py-1 border border-gray-400 rounded-full bg-gray-50 hover:bg-gray-200 font-poppins text-gray-700 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default DefaultButton
