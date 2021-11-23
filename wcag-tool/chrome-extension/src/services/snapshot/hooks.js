import { useDispatch } from 'react-redux'
import { next, previous, createSnapshot, filter } from './snapshotSlice'

const hookGenerator = (action) => () => {
  const dispatch = useDispatch()
  return () => dispatch(action())
}

const hooks = () => [
  hookGenerator(previous),
  hookGenerator(next),
  hookGenerator(createSnapshot),
  hookGenerator(filter),
]

export const [previousHook, nextHook, createSnapshotHook, filterhook] = hooks()
