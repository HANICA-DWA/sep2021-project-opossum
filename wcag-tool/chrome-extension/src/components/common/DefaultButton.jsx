import React from 'react'

const DefaultButton = ({ children, onClick, loading, disabled }) => {
  const defaultStyle = 'bg-gray-50 hover:bg-gray-200 text-gray-700'
  const disabledStyle = 'bg-gray-200 text-gray-400 cursor-default'
  return (
    <button
      type="button"
      className={`px-4 py-1 border border-gray-400 rounded-full font-poppins ${
        !loading && !disabled ? defaultStyle : disabledStyle
      }`}
      onClick={onClick}
      disabled={loading || disabled}
    >
      {!loading ? (
        children
      ) : (
        <div className="relative">
          <div className="opacity-20">{children}</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 animate-bounce absolute left-0 right-0 top-0 ml-auto mr-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        </div>
      )}
    </button>
  )
}

export default DefaultButton
