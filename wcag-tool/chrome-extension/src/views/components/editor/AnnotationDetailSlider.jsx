import React from 'react'
import SlidingPane from 'react-sliding-pane'
import 'react-sliding-pane/dist/react-sliding-pane.css'
import { useDispatch, useSelector } from 'react-redux'
import {
  // deleteAnnotation,
  selectorSelectedAnnotation,
  setHighlightElement,
  setSelectedAnnotation,
  unsetSelectedAnnotation,
} from '../../../services/annotationSlice'
import {
  selectorDetailSliderIsOpen,
  setCreateSliderIsOpen,
  setDetailSliderIsOpen,
  setListSliderIsOpen,
} from '../../../services/slidersSlice'

import IconButton from '../common/IconButton'

export function truncateStringAndCapitalize(num, str = '') {
  const newString = str.charAt(0).toUpperCase() + str.slice(1)

  if (newString.length <= num) {
    return newString
  }

  return `${str.slice(0, num)}...`
}

const AnnotationDetailSlider = function () {
  const annotation = useSelector(selectorSelectedAnnotation)
  const isOpen = useSelector(selectorDetailSliderIsOpen)
  const dispatch = useDispatch()
  return (
    <SlidingPane
      className="hide-default-close 
                 remove-bottom-border 
                 extra-margin 
                 remove-slide-plane-close-padding 
                 remove-slide-plane-content-padding 
                 remove-slide-plane-title-wrapper-margin 
                 remove-slide-plane-title-margin"
      closeIcon={<div />}
      onRequestClose={() => dispatch(setDetailSliderIsOpen(false))}
      from="left"
      width="400px"
      isOpen={isOpen}
      title={
        <div className="grid grid-cols-6 rounded-l items-center px-5">
          <div className="col-span-5">
            <p title={annotation?.title} className="text-base font-medium text-gray-900">
              {truncateStringAndCapitalize(70, annotation?.title)}
            </p>
          </div>
          <div className="flex justify-end">
            <IconButton
              className="pencilIcon p-0.5 mr-1"
              onClick={() => {
                dispatch(setSelectedAnnotation(annotation))
                dispatch(setCreateSliderIsOpen(true))
              }}
            />
            <IconButton
              className="crossIcon p-0.5 ml-1"
              onClick={() => {
                dispatch(setDetailSliderIsOpen(false))
                dispatch(setListSliderIsOpen(true))
                dispatch(unsetSelectedAnnotation())
                dispatch(setHighlightElement(''))
              }}
            />
          </div>
        </div>
      }
    >
      <div className="pl-5 pr-8 py-5">{annotation?.description}</div>
      {/* <div className="flex justify-center">
        <footer className="footer fixed bottom-0 pt-1 py-2  border-b-2">
          <button
            onClick={() => {
              dispatch(deleteAnnotation(annotation?.title))
              dispatch(setDetailSliderIsOpen(false))
              dispatch(setListSliderIsOpen(true))
              dispatch(unsetSelectedAnnotation())
              dispatch(setHighlightElement(''))
            }}
            className="p-2 pl-5 pr-5 bg-red-500 text-gray-100 text-lg rounded-lg focus:border-4 border-green-300"
          >
            Delete annotation
          </button>
        </footer>
      </div> */}
    </SlidingPane>
  )
}

export default AnnotationDetailSlider
