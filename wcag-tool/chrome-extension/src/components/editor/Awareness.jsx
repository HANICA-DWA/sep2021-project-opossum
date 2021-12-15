import React, { useState, useEffect } from 'react'

import AwarenessUserBubble from './AwarenessUserBubble'
import AwarenessUserExcess from './AwarenessUserExcess'

import { useYjs } from '../../hooks'

export function AwarenessSetUser(provider, id, name, color, idle) {
  provider.awareness.setLocalStateField('user', {
    id,
    name,
    color,
    idle,
  })
}

export function AwarenessSetUserIdle(provider, isIdle) {
  const state = provider.awareness.getLocalState()

  if (state) {
    if (state.user.idle !== isIdle) {
      AwarenessSetUser(provider, state.user.id, state.user.name, state.user.color, isIdle)
    }
  }
}

//onmousemove (en misschien onmousedown) triggert zeer vaak wat voor veel belasting op de cpu bezorgt. 
//(letterlijk clearTimeout aanroepen & een if-statement checken kan al 20% cpu belasting bezorgen.) 
export function UserAction(action) {
  window.onload = action
  window.onmousemove = action
  window.onmousedown = action // catches touchscreen presses as well
  window.ontouchstart = action // catches touchscreen swipes as well
  window.onclick = action // catches touchpad clicks as well
  window.onkeydown = action
  window.addEventListener('scroll', action, true)
}

export function IdleUserAction(timeoutDelay, OnUserIdle, OnUserActive) {
  let t
  let canUndoTimeoutAction = false

  UserAction(resetTimer)

  function resetTimer() {
    clearTimeout(t)
    t = setTimeout(() => {
      OnUserIdle()
      canUndoTimeoutAction = true
    }, timeoutDelay)

    if (canUndoTimeoutAction) {
      OnUserActive()
      canUndoTimeoutAction = false
    }
  }
}

const Awareness = () => {
  const { ydoc, provider } = useYjs()
  const [clients, setClients] = useState([])

  const maxUsersVisible = 5

  const clientsToShow = clients.slice(0, maxUsersVisible)
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
      const name = names[Math.floor(Math.random() * names.length)]
      const colors = ['red', 'yellow', 'green', 'violet', 'orange', 'pink', 'gray', 'lime']
      const color = colors[Math.floor(Math.random() * colors.length)]

      // Set awareness information
      AwarenessSetUser(provider, ydoc.clientID, name, color, false)

      IdleUserAction(
        2000,
        () => AwarenessSetUserIdle(provider, true),
        () => AwarenessSetUserIdle(provider, false)
      )
    }

    // Cleanup after unmounting component
    return () => {
      provider.awareness.off('change')
    }
  }, [provider])

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
