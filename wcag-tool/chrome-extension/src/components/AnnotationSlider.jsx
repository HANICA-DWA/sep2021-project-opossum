import React from 'react'
import SlidingPane from 'react-sliding-pane'
import 'react-sliding-pane/dist/react-sliding-pane.css'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectAnnotations,
  selectListSliderIsOpen,
  setListSliderIsOpen,
  setSelectElement,
} from '../services/annotationSlice'
import { AnnotationList, NoAnnotation } from '.'

const AnnotationSlider = function () {
  const annotations = useSelector(selectAnnotations)
  const isOpen = useSelector(selectListSliderIsOpen)
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
              Nu.nl Homepage
            </p>
            <p className="mt-1 text-sm text-gray-500">1 jan 2021</p>
          </div>
          <button
            type="button"
            onClick={() => {
              dispatch(setSelectElement(true))
              dispatch(setListSliderIsOpen(false))
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className=" flex justify-center"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
      }
      from="left"
      onRequestClose={() => dispatch(setListSliderIsOpen(false))}
      width="400px"
    >
      {annotations.length === 0 ? (
        <NoAnnotation />
      ) : (
        <AnnotationList annotations={annotations} />
      )}
    </SlidingPane>
  )
}

export { AnnotationSlider }
