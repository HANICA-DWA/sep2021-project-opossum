import React from 'react'
import { useGetSnapshotsQuery } from '../../services'
import NoSnapshotsFound from './noSnapshotsFound'
import { truncateStringAndCapitalize } from '../editor/AnnotationDetailSlider'

const SnapshotBody = function () {
  const { data: snapshots } = useGetSnapshotsQuery()

  console.log(snapshots)
  return (
    <div>
      {!snapshots || snapshots.length === 0 ? (
        <NoSnapshotsFound />
      ) : (
        snapshots.map(({ name, domain, createdAt }) => (
          <div className="mx-0.5 my-0.5 bg-gray-50 border-2 border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer">
            <div className="pl-5 pr-3 pt-3 pb-4">
              <div className="grid grid-cols-10">
                <div className="col-span-4">
                  <div>
                    <p
                      title={name}
                      className="overflowWrap text-sm text-gray-700 font-poppins-semi"
                    >
                      {name}
                      <div className="flex pt-1">
                        <p className="text-gray-400 text-xs">{createdAt.slice(0, 10)}</p>
                      </div>
                    </p>
                  </div>
                </div>
                <div className="col-span-4 mt-2.5">
                  <p className="overflowWrap text-md">{domain}</p>
                </div>
                <div className=" mt-2 col-span-2 flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default SnapshotBody
