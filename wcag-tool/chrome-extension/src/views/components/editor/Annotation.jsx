import React from 'react'
import { useDispatch } from 'react-redux'
import {
  setDetailSliderIsOpen,
  setHighlightElement,
  setSelectedAnnotation,
} from '../../../services/annotationSlice'

export function truncateStringAndCapitalize(num, str = '') {
  const newString = str.charAt(0).toUpperCase() + str.slice(1)

  if (newString.length <= num) {
    return newString
  }

  return `${str.slice(0, num)}...`
}

const Annotation = function ({ title = '', description = '', selector = '' }) {
  const dispatch = useDispatch()

  return (
    <div
      onMouseEnter={() => dispatch(setHighlightElement(selector))}
      onMouseLeave={() => dispatch(setHighlightElement(''))}
      onClick={() => {
        dispatch(setSelectedAnnotation({ title, description, selector }))
        dispatch(setDetailSliderIsOpen(true))
      }}
      className="max-w-sm px-2 py-1 bg-white border-2 border-gray-300 rounded-md tracking-wide shadow-md hover:bg-gray-100 cursor-pointer"
    >
      <div className="pl-4 pr-2 py-2">
        <div className="mb-4">
          <div className="flex justify-between">
            <div className="">
              <p className="text-xl font-semibold">{title}</p>
            </div>
            <div className="">
              <p>1d ago</p>
            </div>
          </div>
          <div className="">
            <p>Niveau AA</p>
          </div>
        </div>
        <div>
          <p className="italic text-gray-600">
            {truncateStringAndCapitalize(250, description)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Annotation
