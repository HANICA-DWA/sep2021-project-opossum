/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'

import { useGetAnnotationsQuery } from '../services'
import { useGetSnapshotId } from './editor.hooks'

// TODO: Is dit de goede plek?
const ydoc = new Y.Doc()
const provider = new WebsocketProvider('ws://localhost:5000', 'room', ydoc)

export const useYjs = () => {
  useEffect(() => {
    // return () => {
    //   provider.destroy()
    //   ydoc.destroy()
    // }
  }, [])

  return { ydoc, provider }
}

export const useYAnnotations = () => {
  const snapshotId = useGetSnapshotId()
  const [localAnnotations, setLocalAnnotations] = useState([]) // local React state
  const { data: remoteAnnotations, refetch } = useGetAnnotationsQuery(snapshotId) // remote MongoDB state
  const sharedAnnotations = ydoc.getArray(`${snapshotId}-annotations`) // shared Yjs state

  // Setup synchronisation between shared and local state
  useEffect(() => {
    // Initial sync
    if (provider.synced) {
      refetch()
    } else {
      provider.once('synced', refetch)
    }

    sharedAnnotations.observe(() => {
      refetch()
      setLocalAnnotations(sharedAnnotations.toArray())
    })

    return () => {
      sharedAnnotations.unobserve()
    }
  }, [])

  // Sync remote, shared and local states when database changes
  useEffect(() => {
    if (!remoteAnnotations) return

    // 2. Merge remote state with shared state
    sharedAnnotations.delete(0, sharedAnnotations.length) // reset shared state
    sharedAnnotations.push(remoteAnnotations) // set shared state with remote state
    setLocalAnnotations(sharedAnnotations.toArray()) // set local state with shared state
  }, [remoteAnnotations])

  const resetSharedState = () => {
    sharedAnnotations.delete(0, sharedAnnotations.length)
  }

  const insertSharedState = () => {
    sharedAnnotations.push([{ title: 'dummy insert', description: 'test', selector: '.dummy' }])
  }

  return { annotations: localAnnotations, resetSharedState, insertSharedState }
}
