import React from 'react'
import NoSnapshotsFound from './noSnapshotsFound'
import { useGetSnapshotsQuery } from '../../services/apiService'
import SnapshotList from './SnapshotList'

const SnapshotBody = function () {
  const { data: snapshots } = useGetSnapshotsQuery()

  return (
    <div className="mt-12">
      {!snapshots || snapshots.length === 0 ? (
        <NoSnapshotsFound />
      ) : (
        <SnapshotList snapshots={snapshots} />
      )}
    </div>
  )
}

export default SnapshotBody
