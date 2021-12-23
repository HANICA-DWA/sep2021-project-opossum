import { useEffect, useState, useRef } from 'react'
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { useSelector } from 'react-redux'
import config from '../../config.js'

const ydoc = new Y.Doc()

const getUsername = () => {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['username'], (result) => {
      resolve(result.username)
    })
  })
}

const getRandomName = () => {
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
  return names[Math.floor(Math.random() * names.length)]
}

const randomName = getRandomName()

const setUserAwareness = async (provider, id, color, idle) => {
  const name = (await getUsername()) || randomName
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

      setUserAwareness(providerRef.current, ydoc.clientID, color, isIdle)
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
      setUserAwareness(providerRef.current, ydoc.clientID, color, isIdle)
    }
  }, [isIdle])

  return { provider: providerRef.current, clients }
}
