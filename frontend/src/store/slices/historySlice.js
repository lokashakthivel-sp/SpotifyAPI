import { createSlice } from "@reduxjs/toolkit";

const historySlice = createSlice({
  name: "history",
  initialState: {
    isHistorySet: false,
    history: null,
  },
  reducers: {
    setHistory: (state, action) => {
      state.isHistorySet = true;
      state.history = action.payload;
    },
  },
});

export const { setHistory } = historySlice.actions;
export default historySlice.reducer;
