import React from 'react'
import { useSelector } from 'react-redux'
import NoSnapshotsFound from './noSnapshotsFound'

const SnapshotBody = function () {
  const snapshots = useSelector((state) => state.snapshots)

  if (snapshots) {
    return (
      <div>
        <p>hey we load in some snapshots here!</p>
      </div>
    )
  }
  return <div>{NoSnapshotsFound()}</div>
}

export default SnapshotBody
