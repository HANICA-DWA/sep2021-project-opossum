import React from 'react'
import { useDispatch } from 'react-redux'
import { setHighlightedElementSelector } from '../../services/annotationSlice'
import { useSliders } from '../../hooks'

import { stripHtml, timeSince, formatCreatedAtString, capitalizeFirstLetter } from '../../utils'
import LabelList from './LabelList'

const AnnotationListItem = function ({ annotation, index }) {
  const { _id, successCriterium, title, description, selector, createdAt } = annotation

  const labels = [...annotation.labels, successCriterium && `level ${successCriterium.level}`]

  const dispatch = useDispatch()
  const [{ openDetailsSlider }, { detailsSliderIsOpen }] = useSliders()

  return (
    <div
      onMouseEnter={() => dispatch(setHighlightedElementSelector(selector))}
      onMouseLeave={() => {
        if (!detailsSliderIsOpen) dispatch(setHighlightedElementSelector(''))
      }}
      onClick={() => openDetailsSlider(_id, index)}
      className="mx-0.5 my-0.5 bg-gray-50 border-2 border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer"
    >
      <div className="pl-5 pr-3 pt-3 pb-4">
        <div className="grid grid-cols-6">
          <div className="col-span-5">
            <div>
              <p
                title={capitalizeFirstLetter(stripHtml(title)) || 'No title'}
                className="text-base truncate font-poppins-semi mb-1"
              >
                <span className="bg-red-600 rounded-full mr-1">
                  <span className="text-white text-xs font-poppins-semi p-2 pt-2">{index + 1}</span>
                </span>
                {capitalizeFirstLetter(stripHtml(title)) || 'Untitled'}
              </p>
            </div>
            <div className="truncate">
              <LabelList small labels={labels} />
            </div>
          </div>
          <div className="flex justify-end pt-1">
            <p title={formatCreatedAtString(createdAt)[1]} className="text-gray-600 text-xs">
              {timeSince(createdAt)}
            </p>
          </div>
        </div>
        <div className="pt-1">
          <p className="overflowWrap truncate-2 text-md">
            {capitalizeFirstLetter(stripHtml(description))}
          </p>
        </div>
      </div>
    </div>
  )
}

export default AnnotationListItem
