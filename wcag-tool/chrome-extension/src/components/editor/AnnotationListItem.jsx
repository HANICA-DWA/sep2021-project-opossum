import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setHighlightElement, setSelectedAnnotation } from '../../services/annotationSlice'
import { selectorDetailSliderIsOpen, setDetailSliderIsOpen } from '../../services/slidersSlice'

export function truncateStringAndCapitalize(num, str = '') {
  const newString = str.charAt(0).toUpperCase() + str.slice(1)

  if (newString.length <= num) {
    return newString
  }

  return `${str.slice(0, num)}...`
}

const AnnotationListItem = function ({ annotation }) {
  const { title, description, selector } = annotation
  const dispatch = useDispatch()
  const detailSliderIsOpen = useSelector(selectorDetailSliderIsOpen)
  return (
    <div
      onMouseEnter={() => dispatch(setHighlightElement(selector))}
      onMouseLeave={() => {
        if (!detailSliderIsOpen) dispatch(setHighlightElement(''))
      }}
      onClick={() => {
        dispatch(setSelectedAnnotation(annotation))
        dispatch(setDetailSliderIsOpen(true))
      }}
      className="mx-0.5 my-0.5 bg-gray-50 border-2 border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer"
    >
      <div className="pl-5 pr-3 pt-3 pb-4">
        <div className="grid grid-cols-6">
          <div className="col-span-5">
            <div>
              <p title={title} className="text-lg truncate font-poppins-semi">{title}</p>
            </div>
            <div>
              <p>Niveau AA</p>
            </div>
          </div>
          <div className="flex justify-end pt-1">
            <p className="text-gray-600">1d ago</p>
          </div>
        </div>
        <div className="pt-4">
          <p className="text-base overflowWrap">{truncateStringAndCapitalize(100, description)}</p>
        </div>
      </div>
    </div>
  )
}

export default AnnotationListItem
