import React from 'react'
import DefaultButton from '../common/DefaultButton'

// eslint-disable-next-line react/function-component-definition
const NoSnapshotsFound = () => (
  <div className="p-1 text-black">
    <div className="flex p-4 flex-col items-center">
      <div className="folderIcon m-2" />
      <p className="text-xl m-2 font-poppins-semi">No snapshots</p>
      <p className="m-2">Create a snapshot and start analysis</p>
      <DefaultButton
        classNames="m-2 mb-4 shadow border border-gray-400 rounded-full bg-gray-50 hover:bg-gray-200"
      >Create Snapshot</DefaultButton>
    </div>
  </div>
)

export default NoSnapshotsFound
