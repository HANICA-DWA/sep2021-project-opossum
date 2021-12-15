import React, { useState, useEffect } from 'react'

import AwarenessUserBubble from './AwarenessUserBubble'
import AwarenessUserExcess from './AwarenessUserExcess'

import { useYjs } from '../../hooks'

const Awareness = () => {
  const { ydoc, provider } = useYjs()
  const [clients, setClients] = useState([])

  const maxUsersVisible = 5

  const firstNClients = clients.slice(0, maxUsersVisible)
  const excessClients = clients.slice(maxUsersVisible)

  useEffect(() => {
    if (provider) {
      // Listen to awareness changes
      provider.awareness.on('change', () => {
        const _clients = []
        provider.awareness.getStates().forEach((state) => {
          if (state.user) _clients.push({ ...state.user })
        })
        setClients(_clients)
      })

      const names = [
        'Bob',
        'James',
        'Jessie',
        'Rob',
        'Harry',
        'Henk',
        'Jan',
        'Alfred',
        'Xenos',
        'Siegmeyer',
        'Ifrit',
        'Peter',
        'May',
        'Yvonne',
        'Frank',
        'Gerda',
        'Jolanda',
      ]
      const colours = ['red', 'yellow', 'green', 'violet', 'orange', 'pink', 'gray', 'lime']

      // Set awareness information
      provider.awareness.setLocalStateField('user', {
        id: ydoc.clientID,
        name: names[Math.floor(Math.random() * names.length)], // TODO: Change for real values
        color: colours[Math.floor(Math.random() * colours.length)], // TODO: Change for real values
      })
    }

    // Cleanup after unmounting component
    return () => {
      provider.awareness.off('change')
    }
  }, [provider])

  return (
    <div className="flex items-center p-2 pl-4">
      <AwarenessUserExcess clients={excessClients} />
      {firstNClients.map((client, index) => (
        <AwarenessUserBubble client={client} index={index} />
      ))}
    </div>
  )
}

export default Awareness
