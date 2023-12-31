import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    str: "",
    type: "",
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    addRelatedInfo: (state, action) => {
      state.str = action.payload.str;
      state.type = action.payload?.type || "";
    },
    SEARCHRESULTS_FETCH_START: (state) => {
      state.loading = true;
      state.data = null;
      state.error = null;
    },
    SEARCHRESULTS_FETCH_SUCCESS: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    SEARCHRESULTS_FETCH_FAIL: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export default searchSlice.reducer;
export const {
  addRelatedInfo,
  SEARCHRESULTS_FETCH_FAIL,
  SEARCHRESULTS_FETCH_START,
  SEARCHRESULTS_FETCH_SUCCESS,
} = searchSlice.actions;
