import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setHighlightElement, setSelectedAnnotation } from '../../../services/annotationSlice'
import { selectorDetailSliderIsOpen, setDetailSliderIsOpen } from '../../../services/slidersSlice'

const Annotation = function ({ title = '', description = '', selector = '' }) {
  const dispatch = useDispatch()
  const detailSliderIsOpen = useSelector(selectorDetailSliderIsOpen)
  return (
    <div
      onMouseEnter={() => dispatch(setHighlightElement(selector))}
      onMouseLeave={() => {
        if (!detailSliderIsOpen) dispatch(setHighlightElement(''))
      }}
      onClick={() => {
        dispatch(setSelectedAnnotation({ title, description, selector }))
        dispatch(setDetailSliderIsOpen(true))
      }}
      className="max-w-sm bg-white border-2 my-4 border-gray-300 p-6 rounded-md tracking-wide shadow-lg"
    >
      <div id="header" className="flex items-center mb-4">
        <div id="header-text">
          <h4 id="name" className="text-xl font-semibold">
            {title}
          </h4>
          <h5 id="job" className="font-semibold text-blue-600">
            Level AA
          </h5>
        </div>
      </div>
      <div>
        <p className="italic text-gray-600">{description}</p>
      </div>
    </div>
  )
}

export default Annotation
