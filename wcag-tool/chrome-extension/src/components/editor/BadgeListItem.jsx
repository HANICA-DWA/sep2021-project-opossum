import React, { useState, useEffect } from 'react'
import { usePopperTooltip } from 'react-popper-tooltip'
import { stripHtml, truncateStringAndCapitalize } from '../../utils'
import ReactHtmlParser from 'react-html-parser'
import LabelList from './LabelList'
import { useSliders } from '../../hooks'
import { useDispatch } from 'react-redux'
import { setHighlightedElementSelector } from '../../services/annotationSlice'

export default function BadgeListItem({ annotation, index, iframeDoc }) {
  const dispatch = useDispatch()
  const [{ openDetailsSlider }] = useSliders()
  const [position, setPosition] = useState({ top: 0, left: 0 })
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
    const el = iframeDoc.querySelector(annotation.selector)
    setTooltipIsVisible(false)

    if (el) {
      const rect = el.getBoundingClientRect()
      setPosition({
        top: rect.y,
        left: rect.x + (annotation.count - 1) * 25,
      })
    }
  }
  useEffect(() => {
    iframeDoc.addEventListener('scroll', handlePositionChange)
    window.addEventListener('resize', handlePositionChange)

    // wait for iframe content to load before setting position
    setTimeout(() => {
      handlePositionChange()
    }, 300)

    return () => {
      iframeDoc.removeEventListener('scroll', handlePositionChange)
      window.removeEventListener('resize', handlePositionChange)
    }
  }, [])

  return position.top === 0 && position.left === 0 ? null : (
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
        style={position}
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
