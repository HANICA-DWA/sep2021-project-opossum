import React from 'react'
import { usePopperTooltip } from 'react-popper-tooltip'

export const ButtonWithDropdown = ({ className, children }) => {
  const { getArrowProps, getTooltipProps, setTooltipRef, setTriggerRef, visible } =
    usePopperTooltip({ placement: 'bottom-end', trigger: 'click', interactive: true })

  return (
    <div className="z-10">
      <button type="button" className={className} ref={setTriggerRef}>
        {children}
      </button>

      {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({ className: 'tooltip-container scrollableContainer' })}
        >
          <div {...getArrowProps({ className: 'tooltip-arrow' })} />
          <div className="max-h-40 overflow-y-auto p-3">
            <div className="flex items-center p-1">
              <div style={{ backgroundColor: 'red' }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.625 2.655A9 9 0 0119 11a1 1 0 11-2 0 7 7 0 00-9.625-6.492 1 1 0 11-.75-1.853zM4.662 4.959A1 1 0 014.75 6.37 6.97 6.97 0 003 11a1 1 0 11-2 0 8.97 8.97 0 012.25-5.953 1 1 0 011.412-.088z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M5 11a5 5 0 1110 0 1 1 0 11-2 0 3 3 0 10-6 0c0 1.677-.345 3.276-.968 4.729a1 1 0 11-1.838-.789A9.964 9.964 0 005 11zm8.921 2.012a1 1 0 01.831 1.145 19.86 19.86 0 01-.545 2.436 1 1 0 11-1.92-.558c.207-.713.371-1.445.49-2.192a1 1 0 011.144-.83z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M10 10a1 1 0 011 1c0 2.236-.46 4.368-1.29 6.304a1 1 0 01-1.838-.789A13.952 13.952 0 009 11a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex items-center pl-2">
                <p>Auto analysis</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
