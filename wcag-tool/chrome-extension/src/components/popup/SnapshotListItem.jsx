import React from 'react'

const SnapshotListItem = function ({ snapshot }) {
  const { name, domain, createdAt } = snapshot

  function getDomainFromUrl(url) {
    const a = document.createElement('a')
    a.href = url
    return a.hostname
  }

  return (
    <div className="border-b border-gray-300 hover:bg-gray-50 px-3 py-6 grid grid-flow-col justify-start items-center grid-cols-5 gap-x-2 cursor-default">
      <div className="grid grid-flow-row col-span-2">
        <span title={name} className="text-gray-700 truncate">
          {name}
        </span>
        <span className="text-gray-400 text-xs">{createdAt.slice(0, 10)}</span>
      </div>
      <span title={domain} className="truncate text-gray-700 col-span-2">
        {getDomainFromUrl(domain)}
      </span>
      <div />
    </div>
  )
}

export default SnapshotListItem
