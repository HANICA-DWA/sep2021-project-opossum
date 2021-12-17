import React from 'react'
import { usePopperTooltip } from 'react-popper-tooltip'
import './tooltip.css'

const AwarenessUserBubble = ({ client, index }) => {
  const { getArrowProps, getTooltipProps, setTooltipRef, setTriggerRef, visible } =
    usePopperTooltip({ placement: 'top-start' })

  return (
    <div ref={setTriggerRef} className={`flex justify-center -ml-2 ${`z-${9 - index}`}`}>
      <div
        className="h-9 w-9 flex relative justify-center rounded-full border-2 border-white"
        style={{ backgroundColor: client.color }}
      >
        <img src={`https://avatars.dicebear.com/api/bottts/${client.name}.svg`} alt="userIcon" />
        <div
          className={`h-4 w-4 -mb-2 absolute bottom-0 rounded-full border-3 border-white ${
            client.idle ? `bg-orange-400` : `bg-lime-400`
          }`}
        />
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
