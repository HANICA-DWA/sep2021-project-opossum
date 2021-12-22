import React from 'react'
import SlidingPane from 'react-sliding-pane'
import { usePopperTooltip } from 'react-popper-tooltip'
import './react-sliding-pane.css'

import IconButton from '../common/IconButton'
import { useYAnnotations, useSliders, useAnalyse } from '../../hooks'

import AnnotationList from './AnnotationList'
import NoAnnotation from './NoAnnotation'
import Awareness from './Awareness'

import { ButtonWithTooltip } from '../common/ButtonWithTooltip'
import { ButtonWithDropdown } from '../common/ButtonWithDropdown'

const AnnotationListSlider = ({ clients }) => {
  const { annotations } = useYAnnotations()
  const [{ openElementSelector, closeAllSliders }, { listSliderIsOpen }] = useSliders()
  const [analyse, { data, error, loading }] = useAnalyse()

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
                Nu.nl Homepage text is...
                {/* TODO: dynamic title */}
              </p>
            </div>
            <div>
              <p className="mt-1 text-sm text-gray-500">1 Jan 2021</p>
            </div>
          </div>
          <div className="inline-flex justify-end rounded-md shadow-sm" role="group">
            <ButtonWithTooltip
              onClick={openElementSelector}
              toolTipText="Create Annotation"
              className="text-gray-700 border border-gray-500 p-2 hover:bg-gray-200 rounded-l-lg"
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
            </ButtonWithTooltip>
            <ButtonWithDropdown
              onClick={async () => {
                const result = await analyse()
                console.log(result)
              }}
              className="text-gray-700 border border-gray-500 p-2 hover:bg-gray-200 rounded-r-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </ButtonWithDropdown>
          </div>
        </div>
      }
    >
      <div className="flex flex-col h-full justify-between">
        <div className="overflow-y-auto">
          {!annotations || annotations.length === 0 ? (
            <NoAnnotation openElementSelector={openElementSelector} />
          ) : (
            <AnnotationList annotations={annotations} />
          )}
        </div>
        <div>
          <hr />
          <Awareness clients={clients} />
        </div>
      </div>
    </SlidingPane>
  )
}

export default AnnotationListSlider
