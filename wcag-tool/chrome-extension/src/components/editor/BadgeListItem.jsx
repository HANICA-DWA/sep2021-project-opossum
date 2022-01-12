import React, { useState, useEffect, useRef } from 'react'
import { usePopperTooltip } from 'react-popper-tooltip'
import ReactHtmlParser from 'react-html-parser'
import { useDispatch } from 'react-redux'
import { stripHtml } from '../../utils'
import LabelList from './LabelList'
import { useSliders, useOptions } from '../../hooks'
import { setHighlightedElementSelector } from '../../services/annotationSlice'

export default function BadgeListItem({ annotation, index, iframeDoc }) {
  const dispatch = useDispatch()
  const elementRef = useRef()
  const options = useOptions()
  const [{ openDetailsSlider }, { anySliderOpen }] = useSliders()
  const [style, setStyle] = useState({
    top: 0,
    left: 0,
    transition: 'transform 0.5s ease-in-out',
    transform: 'translateX(0px)',
  })
  const [tooltipIsVisible, setTooltipIsVisible] = useState(false)
  const { getArrowProps, getTooltipProps, setTooltipRef, setTriggerRef, visible } =
    usePopperTooltip({
      visible: tooltipIsVisible,
      onVisibleChange: setTooltipIsVisible,
      closeOnOutsideClick: true,
      placement: 'auto-start',
      trigger: 'click',
      offset: [0, 10],
    })

  // TODO: replace with real labels from annotation
  const labels = [
    'auto analysis',
    'draft',
    'level A',
    'level AA',
    'level AAA',
    'minor',
    'moderate',
    'serious',
    'critical',
  ]

  const handlePositionChange = () => {
    setTooltipIsVisible(false)

    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect()

      setStyle((prevState) => ({
        ...prevState,
        top: rect.y,
        left:
          rect.x +
          (annotation.count - 1) * 25 -
          (window.sliderIsOpen && window.sideBySide ? 400 : 0),
      }))
    }
  }

  // useEffect(() => {
  //   if (anySliderOpen && options.sideBySide) {
  //     setStyle((prevState) => ({
  //       ...prevState,
  //       transform: 'translateX(400px)',
  //     }))
  //   } else {
  //     setStyle((prevState) => ({
  //       ...prevState,
  //       transform: 'translateX(0px)',
  //     }))
  //   }
  //
  //   window.sliderIsOpen = anySliderOpen
  //   window.sideBySide = options.sideBySide
  // }, [anySliderOpen])

  useEffect(() => {
    iframeDoc.addEventListener('scroll', handlePositionChange)
    iframeDoc.addEventListener('resize', handlePositionChange)

    // wait for iframe content to load before setting position and element ref
    setTimeout(() => {
      elementRef.current = iframeDoc.querySelector(annotation.selector)
      handlePositionChange()
    }, 500)

    return () => {
      iframeDoc.removeEventListener('scroll', handlePositionChange)
      window.removeEventListener('resize', handlePositionChange)
    }
  }, [])

  return style.top === 0 && style.left === 0 ? null : (
    <>
      <span
        onMouseEnter={() => {
          dispatch(setHighlightedElementSelector(annotation.selector))
        }}
        onMouseLeave={() => {
          dispatch(setHighlightedElementSelector(''))
        }}
        ref={setTriggerRef}
        className="absolute cursor-pointer flex justify-center content-center bg-white rounded-bl-none rounded-full p-1.5 shadow shadow-lg border border-gray-300"
        style={style}
      >
        <div className="bg-red-600 rounded-full">
          <span className="text-white font-poppins-semi p-2 pt-2">{index + 1}</span>
        </div>
      </span>

      {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({
            className: 'tooltip-container tooltip-interactive annotation-popup',
          })}
        >
          <div {...getArrowProps({ className: 'bg-white text-black' })} />

          <div className="grid grid-flow-row gap-y-1">
            <div className="grid grid-flow-col justify-between items-center">
              <p
                title={stripHtml(annotation?.title) || 'No title'}
                className="text-base font-poppins-semi truncate capitalize"
              >
                {stripHtml(annotation?.title) || 'Untitled'}
              </p>
              <div>
                <button
                  onClick={() => {
                    setTooltipIsVisible(false)
                  }}
                  className="text-md rounded-lg focus:border-4 py-1 px-2 text-gray-400 font-poppins hover:bg-gray-100 "
                >
                  X
                </button>
              </div>
            </div>
            <div className="truncate">
              <LabelList small labels={labels} />
            </div>
            <div className="whitespace-normal truncate-2 font-poppins">
              {annotation?.description === undefined ||
              stripHtml(annotation?.description).length === 0
                ? null
                : ReactHtmlParser(annotation?.description)}
            </div>
            <div>
              <button
                onClick={() => {
                  setTooltipIsVisible(false)
                  openDetailsSlider(annotation._id, index)
                }}
                className="text-md rounded-lg focus:border-4 py-1 px-2 text-gray-400 font-poppins hover:bg-gray-100"
              >
                Full details
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
