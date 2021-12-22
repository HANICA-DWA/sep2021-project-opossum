import React from 'react'

// Ctrl + F is your friend! First check if icon already exists!
// Copy the inside of any <svg> tag from https://heroicons.com to the switch statement. Don't forget to properly name is!

export const Icon = ({ name, type = 'solid', size = 5, className }) => {
  function path() {
    switch (`${name}-${type}`) {
      case 'chart-pie-solid':
        return (
          <>
            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
          </>
        )
      case 'chart-pie-outline':
        return (
          <>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
            />
          </>
        )
      case `chevron-down-outline`:
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        )
      case 'chevron-down-solid':
        return (
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        )

      case 'plus-solid':
        return (
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        )
      case 'plus-outline':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        )
      default:
        // Puzzle icon
        return (
          <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
        )
    }
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} h-${size} w-${size}`}
      viewBox="0 0 20 20"
      fill={`${type === 'solid' ? 'currentColor' : 'none'}`}
      stroke={type === 'solid' ? 'none' : 'currentColor'}
    >
      {path()}
    </svg>
  )
}