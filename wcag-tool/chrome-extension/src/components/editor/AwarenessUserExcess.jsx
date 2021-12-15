import React from 'react'
import { usePopperTooltip } from 'react-popper-tooltip'
import './tooltip.css'

const AwarenessUserExcess = ({ clients }) => {
  const { getArrowProps, getTooltipProps, setTooltipRef, setTriggerRef, visible } =
    usePopperTooltip({ placement: 'top-start', trigger: 'click', interactive: true })

  if (clients.length === 0) {
    return <div />
  }

  return (
    <div className="z-10">
      <button
        className="h-9 w-9 flex justify-center items-center bg-gray-200 rounded-full border-2 border-white"
        ref={setTriggerRef}
      >
        <p className="text-sm">+{clients.length}</p>
      </button>

      {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({ className: 'tooltip-container scrollableContainer' })}
        >
          <div {...getArrowProps({ className: 'tooltip-arrow' })} />
          <div className="max-h-40 overflow-y-auto p-2">
            {clients.map((client) => (
              <div key={client.id} className="flex items-center p-1">
                <div className="h-6 w-6 rounded-full" style={{ backgroundColor: client.color }}>
                  <img
                    src={`https://avatars.dicebear.com/api/bottts/${client.name}.svg`}
                    alt="userIcon"
                  />
                </div>
                <div className="flex items-center pl-2">
                  <p>{client.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default AwarenessUserExcess
