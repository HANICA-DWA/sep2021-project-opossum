import React from 'react'
import SnapshotListItem from './SnapshotListItem'

const SnapshotList = function ({ snapshots }) {
  return snapshots.map((snapshot) => <SnapshotListItem key={snapshot._id} snapshot={snapshot} />)
}

export default SnapshotList
