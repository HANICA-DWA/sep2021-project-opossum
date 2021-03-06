import React, { useState } from 'react'
import ReactHtmlParser from 'react-html-parser'
import SlidingPane from 'react-sliding-pane'
import 'react-sliding-pane/dist/react-sliding-pane.css'
import { usePopperTooltip } from 'react-popper-tooltip'
import { useTranslation } from 'react-i18next'
import { useAnnotation, useDeleteAnnotation, useSliders } from '../../hooks'
import { capitalizeFirstLetter, stripHtml } from '../../utils'
import IconButton from '../common/IconButton'
import LabelList from './LabelList'

const AnnotationDetailSlider = function () {
  const [{ openListSlider, openCreateAndEditSlider }, { detailsSliderIsOpen }] = useSliders()
  const { selectedAnnotation, selectedAnnotationId, annotationIndex } = useAnnotation()
  const [deleteAnnotation] = useDeleteAnnotation()
  const { t } = useTranslation()

  const [tooltipIsVisible, setTooltipIsVisible] = useState(false)

  let labels = []
  if (selectedAnnotation) {
    labels = [
      ...selectedAnnotation.labels,
      selectedAnnotation.successCriterium && `level ${selectedAnnotation.successCriterium.level}`,
    ]
  }

  const { getArrowProps, getTooltipProps, setTooltipRef, setTriggerRef, visible } =
    usePopperTooltip({
      visible: tooltipIsVisible,
      onVisibleChange: setTooltipIsVisible,
      closeOnOutsideClick: true,
      placement: 'bottom',
      trigger: 'click',
      offset: [0, 10],
    })

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
            <p
              title={capitalizeFirstLetter(stripHtml(selectedAnnotation?.title)) || t('NO_TITLE')}
              className="text-base font-poppins-semi truncate"
            >
              {annotationIndex !== -1 ? (
                <span className="bg-red-600 rounded-full mr-1">
                  <span className="text-white text-xs font-poppins-semi p-2 pt-2">
                    {annotationIndex + 1}
                  </span>
                </span>
              ) : null}
              {capitalizeFirstLetter(stripHtml(selectedAnnotation?.title)) || t('UNTITLED')}
            </p>
          </div>
          <div className="flex justify-end">
            <IconButton
              title={t('EDIT_ANNOTATION')}
              className="pencilIcon p-0.5 mr-1"
              onClick={() => openCreateAndEditSlider()}
            />
            <IconButton
              title={t('CLOSE_ANNOTATION')}
              className="crossIcon p-0.5 ml-1"
              onClick={openListSlider}
            />
          </div>
        </div>
      }
    >
      <div className="flex flex-col h-full justify-between">
        <div className="pl-5 pr-8 py-3 overflow-y-auto overflow-x-hidden annotation-details">
          <div className="text-md">
            <LabelList labels={labels} />
          </div>
          {ReactHtmlParser(selectedAnnotation?.description)}
        </div>
        <div className="flex justify-center border-t border-gray-400">
          <button
            ref={setTriggerRef}
            className="inline-flex items-center p-2 my-6 pl-3 pr-5 gap-x-2 bg-white hover:bg-red-50 border-red-500 text-red-500 border text-lg rounded-lg focus:border-4"
          >
            <span className="trashIcon" />
            {t('DELETE_ANNOTATION')}
          </button>
          {visible && (
            <div
              ref={setTooltipRef}
              {...getTooltipProps({
                className: 'tooltip-container tooltip-interactive inline-flex items-center fixed',
              })}
            >
              <div {...getArrowProps({ className: 'tooltip-arrow' })} />

              {t('DELETE_ANNOTATION_CONFIRM')}
              <button
                onClick={() => {
                  deleteAnnotation(selectedAnnotationId)
                  setTooltipIsVisible(false)
                }}
                className="inline-flex items-center bg-white hover:bg-red-100 text-red-500 text-lg rounded-lg focus:border-4 p-1 ml-4 border border-red-500"
              >
                <span className="trashIcon text-xs" />
              </button>
              <button
                onClick={() => {
                  setTooltipIsVisible(false)
                }}
                className="inline-flex items-center text-md rounded-lg focus:border-4 py-1 ml-2 px-2 text-gray-400 font-poppins hover:bg-gray-800 "
              >
                {t('CANCEL')}
              </button>
            </div>
          )}
        </div>
      </div>
    </SlidingPane>
  )
}

export default AnnotationDetailSlider
