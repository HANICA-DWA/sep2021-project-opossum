import React from 'react'

const IconButton = function ({ onClick, className, title, ref }) {
  return (
    <button
      ref={ref}
      title={title}
      type="button"
      className={`${className}`} 
      onClick={onClick} 
    />
  )
}

export default IconButton
