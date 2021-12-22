import React from 'react'
import { useDispatch } from 'react-redux'
import { setHighlightedElementSelector } from '../../services/annotationSlice'
import { useSliders } from '../../hooks'

import { truncateStringAndCapitalize, stripHtml } from '../../utils'
import LabelList from './LabelList'

const AnnotationListItem = function ({ annotation }) {
  const { _id, successCriterium, title, description, selector } = annotation

  // TODO: replace with label system in backend
  const labels = [
    'auto analysis',
    'draft',
    'level A',
    'level AA',
    'level AAA',
    'minor',
    'moderate',
    'serious',
    'critical',
  ]
  // successCriterium?.level && labels.push(`level ${successCriterium?.level}`)

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
              <p title={title} className="text-base truncate font-poppins-semi">
                {stripHtml(title)}
              </p>
            </div>
            <div className="text-md mt-2.5">
              <LabelList labels={labels} />
            </div>
          </div>
          <div className="flex justify-end pt-1">
            <p className="text-gray-600 text-xs">1d ago</p>
          </div>
        </div>
        <div className="pt-1">
          <p className="overflowWrap text-md">
            {truncateStringAndCapitalize(110, stripHtml(description))}
          </p>
        </div>
      </div>
    </div>
  )
}

export default AnnotationListItem
