import React from 'react'
import SlidingPane from 'react-sliding-pane'
import { usePopperTooltip } from 'react-popper-tooltip'
import './react-sliding-pane.css'

import IconButton from '../common/IconButton'
import { useYAnnotations, useSliders } from '../../hooks'

import AnnotationList from './AnnotationList'
import NoAnnotation from './NoAnnotation'

const AnnotationListSlider = () => {
  const { annotations } = useYAnnotations()
  const [{ openElementSelector, closeAllSliders }, { listSliderIsOpen }] = useSliders()

  const { getArrowProps, getTooltipProps, setTooltipRef, setTriggerRef, visible } =
    usePopperTooltip({ placement: 'bottom' })

  return (
    <SlidingPane
      width="400px"
      className="remove-slide-plane-content-padding
                 font-poppins
                 text-gray-600"
      shouldCloseOnEsc
      from="left"
      onRequestClose={closeAllSliders}
      closeIcon={<IconButton title="Close Menu" className="arrowLeftIcon" />}
      isOpen={listSliderIsOpen}
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
              onClick={openElementSelector}
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
        <NoAnnotation openElementSelector={openElementSelector} />
      ) : (
        <AnnotationList annotations={annotations} />
      )}
    </SlidingPane>
  )
}

export default AnnotationListSlider
