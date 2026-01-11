import { createSlice } from "@reduxjs/toolkit";

const roastSlice = createSlice({
  name: "roast",
  initialState: {
    isRoastSet: false,
    roast: null,
  },
  reducers: {
    setRoast: (state, action) => {
      state.isRoastSet = true;
      state.roast = action.payload;
    },
  },
});

export const { setRoast } = roastSlice.actions;
export default roastSlice.reducer;
