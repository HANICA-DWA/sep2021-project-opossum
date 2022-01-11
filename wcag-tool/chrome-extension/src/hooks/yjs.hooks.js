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
  const { data: remoteAnnotations, refetch } = useGetAnnotationsQuery(snapshotId) // remote MongoDB state
  const sharedState = ydoc.getText(snapshotId) // shared Yjs state

  useEffect(() => {
    // Initial sync
    if (provider.synced) {
      refetch()
    } else {
      provider.once('synced', refetch)
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
