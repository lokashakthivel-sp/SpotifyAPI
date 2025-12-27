import { createSlice } from "@reduxjs/toolkit";

const topItemsSlice = createSlice({
  name: "topItems",
  initialState: {
    isTopTracksSet: false,
    isTopArtistsSet: false,
    topTracks: null,
    topArtists: null,
  },
  reducers: {
    setTopTracks: (state, action) => {
      state.isTopTracksSet = true;
      state.topTracks = action.payload;
    },
    setTopArtists: (state, action) => {
      state.isTopArtistsSet = true;
      state.topArtists = action.payload;
    },
  },
});

export const { setTopArtists, setTopTracks } = topItemsSlice.actions;
export default topItemsSlice.reducer;
