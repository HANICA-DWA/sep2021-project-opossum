import React from 'react'
import NoSnapshotsFound from './noSnapshotsFound'
import { useGetSnapshotsQuery } from '../../services'
import SnapshotList from './SnapshotList'

const SnapshotBody = function () {
  const { data: snapshots } = useGetSnapshotsQuery()

  return (
    <div className="overflow-auto">
      {!snapshots || snapshots.length === 0 ? (
        <NoSnapshotsFound />
      ) : (
        <SnapshotList snapshots={snapshots} />
      )}
    </div>
  )
}

export default SnapshotBody
