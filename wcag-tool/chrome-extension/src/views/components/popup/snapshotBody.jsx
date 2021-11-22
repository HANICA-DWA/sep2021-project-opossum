import React from 'react'
import { NoSnapshotsFound } from './noSnapshotsFound'

const SnapshotBody = function (previous, next) {
  return <div>{NoSnapshotsFound()}</div>
}

export { SnapshotBody }
