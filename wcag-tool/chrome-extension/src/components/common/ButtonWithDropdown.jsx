import React from 'react'
import { usePopperTooltip } from 'react-popper-tooltip'
import { Icon } from './Icon'

export const ButtonWithDropdown = ({ className, dropdownItems }) => {
  const { getArrowProps, getTooltipProps, setTooltipRef, setTriggerRef, visible } =
    usePopperTooltip({
      placement: 'bottom-end',
      trigger: ['click'],
      interactive: true,
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
            className: 'tooltip-container scrollableContainer',
          })}
        >
          <div {...getArrowProps({ className: 'tooltip-arrow' })} />
          <div className="overflow-y-auto p-2">
            {dropdownItems.map((item) => (
              <div
                key={item.name}
                onClick={item.onClick}
                className="flex items-center justify-start px-3 py-2 hover:bg-gray-100 rounded-md"
              >
                <div className="mr-1">{item.icon}</div>
                <div className="ml-1 flex items-center font-poppins text-lg">
                  <p>{item.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
