import React from 'react'

const SnapshotListItem = function ({ snapshot }) {
  const { _id, name, domain, createdAt } = snapshot

  function getDomainFromUrl(url) {
    const a = document.createElement('a')
    a.href = url
    return a.hostname
  }

  return (
    <div className="mx-0.5 my-0.5 bg-gray-50 border-b border-gray-300  hover:bg-gray-100">
      <div className="pl-5 pr-3 pt-3 pb-4">
        <div className="grid grid-cols-10">
          <div className="col-span-4">
            <div>
              <p title={name} className="overflowWrap text-sm text-gray-700 font-poppins-semi">
                {name}
                <div className="flex pt-1">
                  <p className="text-gray-400 text-xs">{createdAt.slice(0, 10)}</p>
                </div>
              </p>
            </div>
          </div>
          <div className="col-span-4 mt-2.5">
            <p className="overflowWrap text-sm text-gray-700 font-poppins-semi">
              {getDomainFromUrl(domain)}
            </p>
          </div>
          <div className=" mt-2 col-span-2 flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SnapshotListItem
