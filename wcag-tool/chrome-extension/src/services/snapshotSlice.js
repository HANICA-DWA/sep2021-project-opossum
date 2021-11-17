import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const fetchMessage = createAsyncThunk('/message', async ({ rejectWithValue }) => {
  try {
    const res = await axios.get(`http://localhost:3001/message`)
    // console.log(res.data)
    return res.data
  } catch (error) {
    if (!error.response) {
      throw error
    }
    return rejectWithValue(error.response.data)
  }
})

const snapshotSlice = createSlice({
  name: 'snapshot',

  initialState: {
    message: null,
  },

  reducers: {
    setMessage: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.message = action.payload
    },
  },
})

const {
  reducer: snapshotReducer,
  actions: { setMessage },
} = snapshotSlice

export { snapshotReducer, setMessage }
