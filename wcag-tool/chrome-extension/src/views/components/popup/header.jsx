import React from 'react'
import { useDispatch } from 'react-redux'
// eslint-disable-next-line import/named
import { createSnapshot } from '../../../services/snapshot/snapshotSlice'

const Header = function () {
  const dispatch = useDispatch()

  return (
    <div className="flex p-2 px-4 justify-between items-center border rounded-t-lg bg-gray-100 border-gray-300">
      <p>Name</p>
      <p>Site</p>
      <button
        type="button"
        className="p-0.5 px-4 border rounded-full bg-gray-50 border-gray-400 hover:bg-gray-200"
        onClick={() => {
          dispatch(createSnapshot())
        }}
      >
        Create
      </button>
    </div>
  )
}

export { Header }
