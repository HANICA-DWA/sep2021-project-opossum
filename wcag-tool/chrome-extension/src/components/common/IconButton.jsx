/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable prettier/prettier */
import React from 'react'

const IconButton = function ({ onClick, className, title }) {
  return (
    <button
      title={title}
      type="button"
      className={`${className}`} 
      onClick={onClick} 
    />
  )
}

export default IconButton
