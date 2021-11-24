import React from 'react'
import { useSelector } from 'react-redux'
import NoSnapshotsFound from './noSnapshotsFound'

const SnapshotBody = function () {
  const snapshots = useSelector((state) => state.snapshot.snapshots)

  if (snapshots.length === 0) {
    return (
      <div>
        <NoSnapshotsFound />
      </div>
    )
  }
  return (
    <div>
      <p>here we load in some snapshots!</p>
    </div>
  )
}

export default SnapshotBody
