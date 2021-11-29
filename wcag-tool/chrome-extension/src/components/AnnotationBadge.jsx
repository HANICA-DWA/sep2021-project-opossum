import React, { useState } from 'react'

const AnnotationBadge = function ({ x, y }) {
  const [difX, setdifX] = useState(0)
  const [difY, setdifY] = useState(0)
  const [dragging, setdragging] = useState(false)
  const [styles, setStyles] = useState({
    top: y,
    left: x,
    position: 'absolute',
  })

  const handleMouseDown = function (e) {
    setdifX(e.screenX - e.currentTarget.getBoundingClientRect().left)
    setdifY(e.screenY - e.currentTarget.getBoundingClientRect().top)
    setdragging(true)
  }

  const handleMouseUp = function (e) {
    setdragging(false)
  }

  const handleMouseMove = function (e) {
    if (dragging) {
      setStyles({
        position: 'absolute',
        top: e.screenY - difY,
        left: e.screenX - difX,
      })
    }
  }

  return (
    <button
      className="absolute"
      style={styles}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <span className="relative inline-block">
        <svg className="w-6 h-6 text-gray-700 fill-current" viewBox="0 0 20 20">
          <path
            d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
            clipRule="evenodd"
            fillRule="evenodd"
          />
        </svg>
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
          99
        </span>
      </span>
    </button>
  )
}

export { AnnotationBadge }