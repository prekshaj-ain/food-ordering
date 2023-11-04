import { createSlice } from "@reduxjs/toolkit";

const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState: {
    moreDataIds: [],
    data: [],
    filters: {
      Sort: ["Relevance"],
    },
    nextOffset: null,
    loading: false,
    error: null,
  },
  reducers: {
    FETCH_START: (state) => {
      state.loading = true;
      state.error = null;
    },
    FETCH_SUCCESS: (state, action) => {
      if (action.payload.ids) {
        state.moreDataIds = action.payload.ids;
      }
      state.data.push(...action.payload.restaurants);
      state.nextOffset = action.payload.nextOffset;
      state.loading = false;
      state.error = false;
    },
    FETCH_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addFilter: (state, action) => {
      state.filters = action.payload;
    },
    removeFilter: (state, action) => {
      let { filter, val } = action.payload;
      let index = state.filters[filter].indexOf(val);
      if (index != -1) {
        state.filters[filter].splice(index, 1);
      }
    },
    clearFilters: (state) => {
      state.filters = {
        Sort: ["Relevance"],
      };
    },
  },
});

export default restaurantsSlice.reducer;
export const {
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_FAIL,
  addFilter,
  removeFilter,
  clearFilters,
} = restaurantsSlice.actions;
