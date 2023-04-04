import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSearchValue: "New",
  currentSuggestedSearchValue: "Messi",
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    fetchSearchedVideos: (state, action) => {
      state.currentSearchValue = action.payload;
    },
    fetchSuggestedSearchVideos: (state, action) => {
      state.currentSuggestedSearchValue = action.payload;
    },
  },
});

export const { fetchSearchedVideos, fetchSuggestedSearchVideos } =
  videoSlice.actions;

export default videoSlice.reducer;
