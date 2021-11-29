import React from 'react'
import PropTypes from 'prop-types'

const Button = function ({
  name,
  classNames,
  onClick,
  isDisabled,
  disabledStyle,
}) {
  return (
    <button
      disabled={isDisabled}
      type="button"
      className={`p-1 px-4 ${classNames} ${isDisabled ? disabledStyle : ''}`}
      onClick={onClick}
    >
      {name}
    </button>
  )
}

export default Button
