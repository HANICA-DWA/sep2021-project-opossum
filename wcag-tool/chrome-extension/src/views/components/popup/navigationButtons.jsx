import React from 'react'
import { useSelector } from 'react-redux'
import { previousHook, nextHook } from '../../../services/snapshot/hooks'
import Button from '../common/Button'

const NavigationButtons = function () {
  const previous = previousHook()
  const next = nextHook()

  const snapshots = useSelector((state) => state.snapshot.snapshots)
  const disabled =
    snapshots.length === 0
      ? 'disabled:bg-gray-400 cursor-not-allowed text-white'
      : ''
  const disable = snapshots.length === 0

  return (
    <>
      <hr />
      <div className="flex p-2 flex-col items-center">
        <p>Showing 0 Entries</p>
        <div className="flex p-2 text-xl">
          <Button
            name="Prev"
            action={previous}
            isDisabled={disable}
            classNames={`p-2 rounded-l bg-gray-300 text-black hover:bg-gray-400 ${disabled}`}
          />
          <Button
            name="Next"
            action={next}
            isDisabled={disable}
            classNames={`p-2 rounded-r bg-gray-300 text-black hover:bg-gray-400 ${disabled}`}
          />
        </div>
      </div>
    </>
  )
}

export default NavigationButtons
