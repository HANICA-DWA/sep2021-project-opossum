import React, { useState } from 'react'
import { usePopperTooltip } from 'react-popper-tooltip'
import { Icon } from './Icon'

export const ButtonWithDropdown = ({ className, dropdownItems }) => {
  const [tooltipIsVisible, setTooltipIsVisible] = useState(false)
  const { getArrowProps, getTooltipProps, setTooltipRef, setTriggerRef, visible } =
    usePopperTooltip({
      visible: tooltipIsVisible,
      onVisibleChange: setTooltipIsVisible,
      placement: 'bottom-end',
      closeOnOutsideClick: true,
      trigger: 'click',
    })

  return (
    <div className="z-10">
      <button type="button" className={className} ref={setTriggerRef}>
        <Icon name="chevron-down" size={5} />
      </button>

      {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({
            className: 'tooltip-container tooltip-interactive scrollableContainer',
          })}
        >
          <div {...getArrowProps({ className: 'tooltip-arrow' })} />
          <div className="overflow-y-auto p-1">
            {dropdownItems.map((item) => (
              <div
                key={item.name}
                onClick={() => {
                  setTooltipIsVisible(false)
                  item.onClick()
                }}
                className="flex items-center justify-start p-3 rounded-md font-poppins text-sm cursor-pointer text-gray-700 hover:bg-gray-100"
              >
                <div className="mr-3">{item.icon}</div>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
