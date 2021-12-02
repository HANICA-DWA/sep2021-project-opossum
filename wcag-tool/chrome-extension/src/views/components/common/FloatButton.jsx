/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { usePopperTooltip } from 'react-popper-tooltip'
import '../editor/tooltip.css'

const FloatButton = ({
  hidden,
  children,
  onClick,
  tooltipText,
  toolTipPosition = 'bottom',
}) => {
  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip({ placement: toolTipPosition })

  return (
    <>
      <button
        type="button"
        className="text-gray-600 bg-white bg-opacity-80 rounded-full p-1 hover:text-black"
        hidden={hidden}
        ref={setTriggerRef}
        onClick={onClick}
      >
        {children}
      </button>
      {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({ className: 'tooltip-container' })}
        >
          <div {...getArrowProps({ className: 'tooltip-arrow' })} />
          {tooltipText}
        </div>
      )}
    </>
  )
}

export default FloatButton
