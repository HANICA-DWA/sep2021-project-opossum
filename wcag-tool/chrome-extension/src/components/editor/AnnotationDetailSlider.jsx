import React from 'react'
import SlidingPane from 'react-sliding-pane'
import 'react-sliding-pane/dist/react-sliding-pane.css'
import { useAnnotation, useSliders } from '../../hooks'

import IconButton from '../common/IconButton'

export function truncateStringAndCapitalize(num, str = '') {
  const newString = str.charAt(0).toUpperCase() + str.slice(1)

  if (newString.length <= num) {
    return newString
  }

  return `${str.slice(0, num)}...`
}

const AnnotationDetailSlider = function () {
  const [{ openListSlider, openCreateAndEditSlider }, { detailsSliderIsOpen }] = useSliders()
  const { selectedAnnotation, selectedAnnotationId } = useAnnotation()

  return (
    <SlidingPane
      className="hide-default-close 
                 remove-bottom-border 
                 remove-slide-plane-close-padding 
                 remove-slide-plane-content-padding 
                 remove-slide-plane-title-wrapper-margin 
                 remove-slide-plane-title-margin
                 font-poppins
                 text-gray-700"
      closeIcon={<div />}
      onRequestClose={openListSlider}
      from="left"
      width="400px"
      isOpen={detailsSliderIsOpen}
      title={
        <div className="grid grid-cols-6 px-5 rounded-l items-center">
          <div className="col-span-5">
            <p title={selectedAnnotation?.title} className="text-base font-poppins-semi">
              {truncateStringAndCapitalize(70, selectedAnnotation?.title)}
            </p>
          </div>
          <div className="flex justify-end">
            <IconButton
              title="Edit annotation"
              className="pencilIcon p-0.5 mr-1"
              onClick={() => openCreateAndEditSlider(selectedAnnotationId)}
            />
            <IconButton
              title="Close annotation"
              className="crossIcon p-0.5 ml-1"
              onClick={openListSlider}
            />
          </div>
        </div>
      }
    >
      <div className="pl-5 pr-8 py-5">{selectedAnnotation?.description}</div>
    </SlidingPane>
  )
}

export default AnnotationDetailSlider
