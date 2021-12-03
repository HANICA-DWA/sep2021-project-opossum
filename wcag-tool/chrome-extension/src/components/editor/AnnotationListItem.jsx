import React from 'react'
import { useDispatch } from 'react-redux'
import { setHighlightedElementSelector } from '../../services/annotationSlice'
import { useSliders } from '../../hooks'

const AnnotationListItem = function ({ annotation }) {
  const { _id, successCriterium, title, description, selector } = annotation

  // eslint-disable-next-line no-empty-pattern
  const [{ openDetailsSlider }, { detailsSliderIsOpen }] = useSliders()

  const dispatch = useDispatch()

  return (
    <div
      onMouseEnter={() => dispatch(setHighlightedElementSelector(selector))}
      onMouseLeave={() => {
        if (!detailsSliderIsOpen) dispatch(setHighlightedElementSelector(''))
      }}
      onClick={() => openDetailsSlider(_id)}
      className="max-w-sm bg-white border-2 my-4 border-gray-300 p-6 rounded-md tracking-wide shadow-lg"
    >
      <div id="header" className="flex items-center mb-4">
        <div id="header-text">
          <h4 id="name" className="text-xl font-semibold">
            {title}
          </h4>
          <h5 id="job" className="font-semibold text-blue-600">
            {successCriterium?.level || 'NO LEVEL DEFINED'}
          </h5>
        </div>
      </div>
      <div>
        <p className="italic text-gray-600">{description}</p>
      </div>
    </div>
  )
}

export default AnnotationListItem
