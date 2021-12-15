import React from 'react'
import { usePopperTooltip } from 'react-popper-tooltip'
import './tooltip.css'

const AwarenessUserBubble = ({ client, index }) => {
  const { getArrowProps, getTooltipProps, setTooltipRef, setTriggerRef, visible } =
    usePopperTooltip({ placement: 'top-start' })

  return (
    <div
      key={client.id}
      ref={setTriggerRef}
      className={`flex justify-center -ml-2 ${`z-${9 - index}`}`}
    >
      <div
        className="h-9 w-9 flex justify-center rounded-full border-2 border-white"
        style={{ backgroundColor: client.color }}
      >
        <img src={`https://avatars.dicebear.com/api/bottts/${client.name}.svg`} alt="userIcon" />
        <div className="h-4 w-4 absolute bottom-0 rounded-full border-3 border-white bg-green-400" />
      </div>

      {visible && (
        <div ref={setTooltipRef} {...getTooltipProps({ className: 'tooltip-container' })}>
          <div {...getArrowProps({ className: 'tooltip-arrow' })} />
          {client.name}
        </div>
      )}
    </div>
  )
}

export default AwarenessUserBubble
