import React from 'react'
import { useDispatch } from 'react-redux'
import { setHighlightedElementSelector } from '../../services/annotationSlice'
import { useSliders } from '../../hooks'

import { truncateStringAndCapitalize } from './AnnotationDetailSlider'

const AnnotationListItem = function ({ annotation }) {
  const { _id, successCriterium, title, description, selector } = annotation

  const dispatch = useDispatch()
  const [{ openDetailsSlider }, { detailsSliderIsOpen }] = useSliders()

  return (
    <div
      onMouseEnter={() => dispatch(setHighlightedElementSelector(selector))}
      onMouseLeave={() => {
        if (!detailsSliderIsOpen) dispatch(setHighlightedElementSelector(''))
      }}
      onClick={() => openDetailsSlider(_id)}
      className="mx-0.5 my-0.5 bg-gray-50 border-2 border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer"
    >
      <div className="pl-5 pr-3 pt-3 pb-4">
        <div className="grid grid-cols-6">
          <div className="col-span-5">
            <div>
              {/* TODO: even checken wat dit doen */}
              <p title={title} className="text-lg truncate font-poppins-semi">
                {title}
              </p>
            </div>
            <div>
              <p className="font-semibold text-blue-600">
                {successCriterium?.level || 'NO LEVEL DEFINED'}
              </p>
            </div>
          </div>
          <div className="flex justify-end pt-1">
            <p className="text-gray-600">1d ago</p>
          </div>
        </div>
        <div className="pt-4">
          <p className="text-base overflowWrap">{truncateStringAndCapitalize(100, description)}</p>
        </div>
        {/* Success criterium: WCAG toevoegen */}
      </div>
    </div>
  )
}

export default AnnotationListItem
