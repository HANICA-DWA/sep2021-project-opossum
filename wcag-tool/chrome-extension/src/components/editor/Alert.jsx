import React from 'react'
import { useState } from 'react'
import { Icon } from '../common/Icon'

const Alert = ({ title, message, color, action, hidden }) => {
  const [show, setShow] = useState(true)

  return (
    <div
      className={`${
        (hidden || !show) && 'hidden'
      } bg-${color}-100 border-l-4 border-${color}-700 text-${color}-700 p-3 mb-0.5 flex justify-between`}
      role="alert"
      onClick={() => setShow(false)}
    >
      <div>
        <p className="font-bold">{title}</p>
        <p>{message}</p>
      </div>
      {action ? (
        <button
          type="button"
          className={`py-1 px-3 border-${color}-400 bg-${color}-700 hover:bg-${color}-800 text-gray-100  rounded-lg focus:border-4`}
          onClick={() => {
            action.method()
            setShow(false)
          }}
          disabled={action.disabled}
        >
          {action.name}
        </button>
      ) : (
        <button
          type="button"
          className="h-5 w-5 justify-self-start"
          onClick={() => {
            setShow(false)
          }}
        >
          <Icon name="x" />
        </button>
      )}
    </div>
  )
}

export default Alert
