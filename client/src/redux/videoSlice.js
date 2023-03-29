import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchFromApi } from "../fetchFromApi.js";

export const fetchAsyncVideos = createAsyncThunk(
  "videos/fetchVideos",
  async () => {
    try {
      const response = await fetchFromApi(`search?part=snippet&q=${"New"}`);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  }
);

const initialState = {
  currentSearchValue: {},
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    // fetchVideos: (state, action) => {
    //   state.currentSearchValue = action.payload;
    // },
  },
  extraReducers: {
    [fetchAsyncVideos.pending]: () => {
      console.log("Pending");
    },
    [fetchAsyncVideos.fulfilled]: (state, action) => {
      console.log("Successful");
      state.currentSearchValue = action.payload;
    },
    [fetchAsyncVideos.rejected]: () => {
      console.log("Rejected");
    },
  },
});

export const { searchValue } = videoSlice.actions;

export default videoSlice.reducer;
