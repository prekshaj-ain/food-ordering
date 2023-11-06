import { createSlice } from "@reduxjs/toolkit";

const suggestionsSlice = createSlice({
  name: "suggestions",
  initialState: {
    cache: {},
    loading: false,
    error: null,
  },
  reducers: {
    cacheResults: (state, action) => {
      state.loading = false;
      state.cache = Object.assign(state.cache, action.payload);
      state.error = null;
    },
    SUGGESTIONS_FETCH_START: (state) => {
      state.loading = true;
      state.error = null;
    },
    SUGGESTIONS_FETCH_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default suggestionsSlice.reducer;
export const { cacheResults, SUGGESTIONS_FETCH_FAIL, SUGGESTIONS_FETCH_START } =
  suggestionsSlice.actions;
