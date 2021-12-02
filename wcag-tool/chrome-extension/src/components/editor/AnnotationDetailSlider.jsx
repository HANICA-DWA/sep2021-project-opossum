import React from 'react'
import SlidingPane from 'react-sliding-pane'
import 'react-sliding-pane/dist/react-sliding-pane.css'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectDetailSliderIsOpen,
  setDetailSliderIsOpen,
  selectSelectedAnnotation,
  deleteAnnotation,
  setSelectedAnnotation,
  setEditSliderIsOpen,
  setHighlightElement,
} from '../../services/annotationSlice'

export function truncateStringAndCapitalize(num, str = '') {
  const newString = str.charAt(0).toUpperCase() + str.slice(1)

  if (newString.length <= num) {
    return newString
  }

  return `${str.slice(0, num)}'...'`
}

const AnnotationDetailSlider = function () {
  const annotation = useSelector(selectSelectedAnnotation)
  const isOpen = useSelector(selectDetailSliderIsOpen)
  const dispatch = useDispatch()
  return (
    <SlidingPane
      closeIcon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 18 18"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      }
      isOpen={isOpen}
      title={
        <div className="grid grid-cols-6 rounded-l">
          <div className="col-span-5">
            <p className="text-base font-medium text-gray-900">
              {truncateStringAndCapitalize(20, annotation.title)}
            </p>
          </div>
          <button
            onClick={() => {
              dispatch(setSelectedAnnotation(annotation))
              dispatch(setEditSliderIsOpen(true))
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
        </div>
      }
      from="left"
      onRequestClose={() => dispatch(setDetailSliderIsOpen(false))}
      width="400px"
    >
      {annotation.description}
      <div className="flex justify-center">
        <footer className="footer fixed bottom-0 pt-1 py-2  border-b-2">
          <button
            onClick={() => {
              dispatch(deleteAnnotation(annotation.title))
              dispatch(setDetailSliderIsOpen(false))
              dispatch(setHighlightElement(''))
            }}
            className="p-2 pl-5 pr-5 bg-red-500 text-gray-100 text-lg rounded-lg focus:border-4 border-green-300"
          >
            Delete annotation
          </button>
        </footer>
      </div>
    </SlidingPane>
  )
}

export default AnnotationDetailSlider
