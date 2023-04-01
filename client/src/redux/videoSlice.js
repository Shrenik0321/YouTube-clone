import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSearchValue: "New",
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    fetchSearchedVideos: (state, action) => {
      console.log(action.payload);
      state.currentSearchValue = action.payload;
    },
  },
});

export const { fetchSearchedVideos } = videoSlice.actions;

export default videoSlice.reducer;
