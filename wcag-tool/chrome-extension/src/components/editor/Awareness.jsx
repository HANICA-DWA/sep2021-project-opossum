import React, { useState, useEffect } from 'react'

import AwarenessUserBubble from './AwarenessUserBubble'
import AwarenessUserExcess from './AwarenessUserExcess'
import { useAwareness } from '../../hooks/awareness.hook'

const Awareness = ({ room }) => {
  const { clients } = useAwareness(room)

  const maxUsersVisible = 5

  const clientsToShow = clients.slice(0, maxUsersVisible)
  const excessClients = clients.slice(maxUsersVisible)

  return (
    <div className="flex items-center p-2 pl-4">
      <AwarenessUserExcess clients={excessClients} />
      {clientsToShow.map((client, index) => (
        <AwarenessUserBubble client={client} index={index} />
      ))}
    </div>
  )
}

export default Awareness