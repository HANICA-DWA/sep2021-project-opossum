import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setOpenSnapshotNotAllowed } from '../../services/popupSlice'
import { formatCreateAtString } from '../../utils'

const SnapshotListItem = function ({ snapshot }) {
  const { _id, filename, name, domain, createdAt } = snapshot

  function getDomainFromUrl(url) {
    const a = document.createElement('a')
    a.href = url
    return a.hostname
  }
  const [loading, setLoading] = useState(false)
  const openSnapshotNotAllowed = useSelector((state) => state.popup.openSnapshotNotAllowed)
  const dispatch = useDispatch()
  const [formattedDate, formattedDatetime] = formatCreateAtString(createdAt)

  return (
    <div className="border-b border-gray-300 hover:bg-gray-50 px-3 py-6 grid grid-flow-col justify-start items-center grid-cols-5 gap-x-2 cursor-default">
      <div className="grid grid-flow-row col-span-2">
        <span title={name} className="text-gray-700 truncate">
          {name}
        </span>
        <span title={formattedDatetime} className="text-gray-400 text-xs">
          {formattedDate}
        </span>
      </div>
      <span title={domain} className="truncate text-gray-700  col-span-2">
        {getDomainFromUrl(domain)}
      </span>
      <button
        type="button"
        title="Open Snapshot"
        className={`fill-current text-gray-500 justify-self-end mr-3 px-2 py-1 hover:bg-gray-200 rounded-md disabled:cursor-default ${
          loading ? 'bg-gray-200' : 'disabled:opacity-50 disabled:bg-transparent'
        }`}
        disabled={openSnapshotNotAllowed}
        onClick={async () => {
          setLoading(true)
          dispatch(setOpenSnapshotNotAllowed(true))
          const [tab] = await browser.tabs.query({ active: true, currentWindow: true })
          await browser.runtime.sendMessage({
            method: 'downloads.downloadSnapshot',
            snapshotId: _id,
            filename,
            tab,
          })
          setLoading(false)
          dispatch(setOpenSnapshotNotAllowed(false))
        }}
      >
        {!loading ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 animate-spin"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
          >
            <circle
              cx="50"
              cy="50"
              fill="none"
              stroke="#e15b64"
              strokeWidth="10"
              r="35"
              strokeDasharray="164.93361431346415 56.97787143782138"
              transform="matrix(1,0,0,1,0,0)"
            />
          </svg>
        )}
      </button>
    </div>
  )
}
export default SnapshotListItem
