import React from 'react'
import SlidingPane from 'react-sliding-pane'
import { useDispatch, useSelector } from 'react-redux'
import { usePopperTooltip } from 'react-popper-tooltip'
import './react-sliding-pane.css'

import { useGetAnnotationsQuery } from '../../services/apiService'
import { selectorListSliderIsOpen, setListSliderIsOpen } from '../../services/slidersSlice'
import { setSelectElement, unsetSelectedAnnotation } from '../../services/annotationSlice'

import AnnotationList from './AnnotationList'
import NoAnnotation from './NoAnnotation'

const AnnotationListSlider = () => {
  const { data: annotations } = useGetAnnotationsQuery('61a9f47fe84cdb57824daed3') // TODO: replace with real snapshotId
  const isOpen = useSelector(selectorListSliderIsOpen)
  const dispatch = useDispatch()
  const { getArrowProps, getTooltipProps, setTooltipRef, setTriggerRef, visible } =
    usePopperTooltip({ placement: 'bottom' })
  return (
    <SlidingPane
      width="400px"
      shouldCloseOnEsc
      closeIcon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      }
      isOpen={isOpen}
      title={
        <>
          <div className="grid grid-flow-row">
            <span className="text-base font-medium text-gray-900 self-end truncate">
              Nu.nl Homepage text is way too long for the pane
            </span>
            <span className="mt-1 text-sm text-gray-500 self-start truncate">1 Jan 2021</span>
          </div>
          <div className="self-center">
            <button
              onClick={() => {
                dispatch(setSelectElement(true))
                dispatch(unsetSelectedAnnotation())
                dispatch(setListSliderIsOpen(false))
              }}
              ref={setTriggerRef}
              className="text-gray-700 border border-gray-500 rounded-full p-2 hover:bg-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {visible && (
              <div ref={setTooltipRef} {...getTooltipProps({ className: 'tooltip-container' })}>
                <div {...getArrowProps({ className: 'tooltip-arrow' })} />
                Create Annotation
              </div>
            )}
          </div>
        </>
      }
      from="left"
      onRequestClose={() => dispatch(setListSliderIsOpen(false))}
    >
      {!annotations || annotations.length === 0 ? (
        <NoAnnotation />
      ) : (
        <AnnotationList annotations={annotations} />
      )}
    </SlidingPane>
  )
}

export default AnnotationListSlider
