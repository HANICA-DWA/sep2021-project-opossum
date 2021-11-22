import React from 'react'
import { useDispatch } from 'react-redux'
// eslint-disable-next-line import/named
import { previous, next } from '../../../services/snapshot/snapshotSlice'

const NavigationButtons = function () {
  const dispatch = useDispatch()

  return (
    <div className="flex p-2 flex-col items-center">
      <p>Showing 0 Entries</p>
      <div className="flex p-2 text-xl">
        <button
          type="button"
          className="p-2 px-4 rounded-l bg-gray-400 text-white hover:bg-gray-600"
          onClick={() => {
            dispatch(previous())
          }}
        >
          Prev
        </button>
        <button
          type="button"
          className="p-2 px-4 rounded-r bg-gray-400 text-white hover:bg-gray-600"
          onClick={() => {
            dispatch(next())
          }}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export { NavigationButtons }
