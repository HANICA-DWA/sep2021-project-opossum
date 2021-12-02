import React from 'react'

const SearchBar = function () {
  return (
    <div className="m-1.5">
      <div className="flex items-center p-1 border rounded-md border-gray-300 bg-gray-100">
        <div className="px-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          className="p-2 flex-1 bg-gray-100"
          placeholder="Search to refine results..."
        />
      </div>
    </div>
  )
}

export default SearchBar
