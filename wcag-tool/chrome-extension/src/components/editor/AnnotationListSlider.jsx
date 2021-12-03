import React from 'react'
import './react-sliding-pane.css'
import SlidingPane from 'react-sliding-pane'
import { useDispatch, useSelector } from 'react-redux'
import { usePopperTooltip } from 'react-popper-tooltip'
import { setSelectElement, unsetSelectedAnnotation } from '../../services/annotationSlice'
import NoAnnotation from './NoAnnotation'
import AnnotationList from './AnnotationList'
import IconButton from '../common/IconButton'
import { selectorListSliderIsOpen, setListSliderIsOpen } from '../../services/slidersSlice'
import { useGetAnnotationsQuery } from '../../services/apiService'

const AnnotationListSlider = () => {
  const { data: annotations } = useGetAnnotationsQuery('61a9f47fe84cdb57824daed3') // TODO: replace with real snapshotId
  const isOpen = useSelector(selectorListSliderIsOpen)
  const dispatch = useDispatch()
  const { getArrowProps, getTooltipProps, setTooltipRef, setTriggerRef, visible } =
    usePopperTooltip({ placement: 'bottom' })
  return (
    <SlidingPane
      width="400px"
      className="remove-slide-plane-content-padding
                 font-poppins
                 text-gray-700"
      shouldCloseOnEsc
      from="left"
      onRequestClose={() => dispatch(setListSliderIsOpen(false))}
      closeIcon={
        <IconButton
          title="Close Menu"
          className="arrowLeftIcon"
        />
      }
      isOpen={isOpen}
      title={
        <div className="grid grid-cols-6 items-center pr-3">
          <div className="col-span-5">
            <div className="text-base">
              <p className="truncate" title="Nu.nl Homepage text is way too long for the pane">
                Nu.nl Homepage text is way too long for the pane
              </p>
            </div>
            <div>
              <p className="mt-1 text-sm text-gray-500">1 Jan 2021</p>
            </div>
          </div>
          <div className="flex justify-end">
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
          </div>
          <div className="self-center">
            {visible && (
              <div ref={setTooltipRef} {...getTooltipProps({ className: 'tooltip-container' })}>
                <div {...getArrowProps({ className: 'tooltip-arrow' })} />
                Create Annotation
              </div>
            )}
          </div>
        </div>
      }
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
