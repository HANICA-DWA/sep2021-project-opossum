import React from 'react'
import PropTypes from 'prop-types'

const Button = function (props) {
  const { name, classNames, onClick, isDisabled } = props

  return (
    <button
      disabled={isDisabled}
      type="button"
      className={`p-1 px-4 ${classNames}`}
      onClick={onClick}
    >
      {name}
    </button>
  )
}

Button.propTypes = {
  name: PropTypes.string,
  classNames: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
}

Button.defaultProps = {
  name: '',
  classNames: '',
  isDisabled: false,
}

export default Button
