import { useEffect, useRef } from 'react'
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import config from '../../config'

import { useGetAnnotationsQuery } from '../services'
import { useGetSnapshotId } from './editor.hooks'

// TODO: Is dit de goede plek?
export const useYjs = () => {
  const ydocRef = useRef(new Y.Doc())
  const providerRef = useRef(new WebsocketProvider(config.WEBSOCKET_URL, 'room', ydoc))

  useEffect(() => {
    // return () => {
    //   provider.destroy()
    //   ydoc.destroy()
    // }
  }, [])

  return { ydoc: ydocRef.current, provider: providerRef.current }
}

export const useYAnnotations = () => {
  const snapshotId = useGetSnapshotId()
  console.log('test');

  const ydocRef = useRef(new Y.Doc())
  const providerRef = useRef(new WebsocketProvider(config.WEBSOCKET_URL, snapshotId, ydocRef.current))

  const { data: remoteAnnotations = [], refetch } = useGetAnnotationsQuery(snapshotId) // remote MongoDB state
  const sharedState = ydocRef.current.getText(snapshotId) // shared Yjs state

  useEffect(() => {
    // Initial sync
    if (providerRef.current.synced) {
      refetch()
    } else {
      providerRef.current.once('synced', refetch)
    }

    sharedState.observe(() => {
      refetch()
    })

    return () => {
      sharedState.unobserve()
    }
  }, [])

  // Sync remote, shared and local states when database changes
  useEffect(() => {
    sharedState.insert(0, 'a')
  }, [remoteAnnotations])

  return { annotations: remoteAnnotations }
}
