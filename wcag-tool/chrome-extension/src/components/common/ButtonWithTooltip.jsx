import React from 'react'
import { usePopperTooltip } from 'react-popper-tooltip'

export const ButtonWithTooltip = ({ onClick, toolTipText, className, children }) => {
  const { getArrowProps, getTooltipProps, setTooltipRef, setTriggerRef, visible } =
    usePopperTooltip({ placement: 'bottom' })

  return (
    <>
      <button onClick={onClick} ref={setTriggerRef} className={className}>
        {children}
      </button>
      <div className="self-center">
        {visible && (
          <div ref={setTooltipRef} {...getTooltipProps({ className: 'tooltip-container' })}>
            <div {...getArrowProps({ className: 'tooltip-arrow' })} />
            {toolTipText}
          </div>
        )}
      </div>
    </>
  )
}
