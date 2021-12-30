import React, { useState, useEffect, useRef } from 'react'
import { usePopperTooltip } from 'react-popper-tooltip'
import ReactHtmlParser from 'react-html-parser'
import { useDispatch } from 'react-redux'
import { stripHtml, truncateStringAndCapitalize } from '../../utils'
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
      placement: 'bottom',
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

  useEffect(() => {
    if (anySliderOpen && options.sideBySide) {
      setStyle((prevState) => ({
        ...prevState,
        transform: 'translateX(400px)',
      }))
    } else {
      setStyle((prevState) => ({
        ...prevState,
        transform: 'translateX(0px)',
      }))
    }

    window.sliderIsOpen = anySliderOpen
    window.sideBySide = options.sideBySide
  }, [anySliderOpen])

  useEffect(() => {
    iframeDoc.addEventListener('scroll', handlePositionChange)
    window.addEventListener('resize', handlePositionChange)

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
      <div
        onMouseEnter={() => {
          dispatch(setHighlightedElementSelector(annotation.selector))
        }}
        onMouseLeave={() => {
          dispatch(setHighlightedElementSelector(''))
        }}
        ref={setTriggerRef}
        className="absolute cursor-pointer animate-pulse"
        badge={index + 1}
        style={style}
      />

      {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({
            className: 'tooltip-container tooltip-interactive ',
          })}
        >
          <div {...getArrowProps({ className: 'tooltip-arrow' })} />

          <div className="w-80">
            <div className="">
              <p title={annotation?.title} className="text-base font-poppins-semi truncate">
                {truncateStringAndCapitalize(70, stripHtml(annotation?.title))}
              </p>
            </div>
            <div className="truncate">
              <LabelList labels={labels} />
            </div>
            <div className=" overflow-y-auto overflow-x-hidden whitespace-normal annotation-details">
              {ReactHtmlParser(annotation?.description)}
            </div>

            <button
              onClick={() => {
                setTooltipIsVisible(false)
              }}
              className="inline-flex items-center text-md rounded-lg focus:border-4 py-1 ml-2 px-2 text-gray-400 font-poppins hover:bg-gray-800 "
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setTooltipIsVisible(false)
                openDetailsSlider(annotation._id)
              }}
              className="inline-flex items-center text-md rounded-lg focus:border-4 py-1 ml-2 px-2 text-gray-400 font-poppins hover:bg-gray-800 "
            >
              Full details
            </button>
          </div>
        </div>
      )}
    </>
  )
}
