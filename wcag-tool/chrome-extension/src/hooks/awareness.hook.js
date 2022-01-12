import { useEffect, useState, useRef } from 'react'
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { useSelector } from 'react-redux'
import { useOptions } from '.'
import config from '../../config'

const ydoc = new Y.Doc()

const setUserAwareness = (provider, name, id, color, idle) => {
  name = name || 'unnamed user'
  provider.awareness.setLocalStateField('user', {
    id,
    name,
    color,
    idle,
  })
}

const joinRoom = (room) => {
  return new WebsocketProvider(config.WEBSOCKET_URL, room, ydoc)
}

const getRandomColor = () => {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

const color = getRandomColor()

export const useAwareness = (room) => {
  const [clients, setClients] = useState([])
  const options = useOptions()
  const isIdle = useSelector((state) => state.user.isIdle)
  const providerRef = useRef()

  useEffect(() => {
    if (!providerRef.current) {
      providerRef.current = joinRoom(room)

      providerRef.current.awareness.on('change', () => {
        const _clients = []
        providerRef.current.awareness.getStates().forEach((state) => {
          if (state.user) _clients.push({ ...state.user })
        })
        setClients(_clients)
      })

      setUserAwareness(providerRef.current, options.username, ydoc.clientID, color, isIdle)
    }

    return () => {
      if (providerRef.current) {
        providerRef.current.destroy()
        providerRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (providerRef.current) {
      setUserAwareness(providerRef.current, options.username, ydoc.clientID, color, isIdle)
    }
  }, [isIdle, options])

  return { provider: providerRef.current, clients }
}
