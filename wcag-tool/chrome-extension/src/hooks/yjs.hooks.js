import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { useEffect } from 'react'

const ydoc = new Y.Doc()
const provider = new WebsocketProvider('ws://localhost:5000', 'room', ydoc)

export const useYjs = () => {
  useEffect(() => {
    return () => {
      provider.destroy()
      ydoc.destroy()
    }
  }, [])

  return { ydoc, provider }
}
