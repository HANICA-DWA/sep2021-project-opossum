/* eslint-disable import/named */
import React from 'react'
import { previousHook, nextHook } from '../../../services/snapshot/hooks'
import { Button } from '../common/Button'

const NavigationButtons = function () {
  const previous = previousHook()
  const next = nextHook()

  return (
    <div className="flex p-2 flex-col items-center">
      <p>Showing 0 Entries</p>
      <div className="flex p-2 text-xl">
        <Button
          name="Prev"
          action={previous()}
          classNames="p-2 rounded-l bg-gray-400 text-white hover:bg-gray-600"
        />

        {/* <button
          type="button"
          className="p-2 px-4 rounded-l bg-gray-400 text-white hover:bg-gray-600"
          onClick={() => {
            previous()
          }}
        >
          Prev
        </button> */}

        <Button
          name="Next"
          action={next()}
          classNames="p-2 rounded-r bg-gray-400 text-white hover:bg-gray-600"
        />
        {/* <button
          type="button"
          className="p-2 px-4 rounded-r bg-gray-400 text-white hover:bg-gray-600"
          onClick={() => {
            next()
          }}
        >
          Next
        </button> */}
      </div>
    </div>
  )
}

export { NavigationButtons }
