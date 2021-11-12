import { useSelector, useDispatch } from 'react-redux'
import { setBorderWidth, setBorderColor, setEnableBorders } from '../services/settingsSlice'

const useSettings = () => {
  const dispatch = useDispatch()
  const { borderWidth, borderColor, enableBorders } = useSelector((state) => state.settings)

  return [
    {
      setBorderWidth: (width) => dispatch(setBorderWidth(width)),
      setBorderColor: (color) => dispatch(setBorderColor(color)),
      setEnableBorders: (isEnabled) => dispatch(setEnableBorders(isEnabled)),
    },
    { borderWidth, borderColor, enableBorders },
  ]
}

export { useSettings }
