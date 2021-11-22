import { useDispatch } from 'react-redux'
// eslint-disable-next-line import/named
import { next, previous, createSnapshot } from './snapshotSlice'

const nextHook = () => {
  const dispatch = useDispatch()

  return () => dispatch(next())
}

const previousHook = () => {
  const dispatch = useDispatch()

  return () => dispatch(previous())
}

const createSnapshotHook = () => {
  const dispatch = useDispatch()

  return () => dispatch(createSnapshot())
}

export { nextHook, previousHook, createSnapshotHook }
