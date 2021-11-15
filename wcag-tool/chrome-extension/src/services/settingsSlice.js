import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    borderColor: "red",
    borderWidth: 1,
    enableBorders: false,
  },
  reducers: {
    setBorderColor(state, action) {
      state.borderColor = action.payload;
    },
    setBorderWidth(state, action) {
      state.borderWidth = action.payload;
    },
    setEnableBorders(state, action) {
      state.enableBorders = action.payload;
    },
  },
});

const {
  reducer: settingsReducer,
  actions: { setBorderColor, setBorderWidth, setEnableBorders },
} = settingsSlice;

export { settingsReducer, setBorderColor, setBorderWidth, setEnableBorders };
