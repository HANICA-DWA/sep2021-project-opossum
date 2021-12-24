import React from 'react'

const IconButton = function ({ onClick, className, title }) {
  return (
    <button
      aria-label="button"
      title={title}
      type="button"
      className={className}
      onClick={onClick}
    />
  )
}

export default IconButton
