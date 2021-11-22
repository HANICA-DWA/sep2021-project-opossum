import React from 'react'
import { useDispatch } from 'react-redux'

const Button = function (props) {
  const dispatch = useDispatch()

  return (
    <button
      type="button"
      className={`p-2 px-4 rounded-r bg-gray-400 text-white hover:bg-gray-600 ${props.className}`}
      onClick={() => {
        props.action()
      }}
    >
      props.buttonName
    </button>
  )
}

export { Button }
