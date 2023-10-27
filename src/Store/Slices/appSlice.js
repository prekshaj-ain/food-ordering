import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    currentRestaurant: null,
  },
  reducers: {
    setCurrentRestaurant: (state, action) => {
      state.currentRestaurant = action.payload;
    },
  },
});

export default appSlice.reducer;
export const { setCurrentRestaurant } = appSlice.actions;
