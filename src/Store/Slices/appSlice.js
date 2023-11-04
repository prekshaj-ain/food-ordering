import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    currentRestaurant: null,
    filters: {
      Sort: {
        type: "radio",
        subFilter: [
          { title: "Relevance" },
          { title: "Delivery Time" },
          { title: "Rating" },
          { title: "Cost: high to low" },
          { title: "Cost: low to high" },
        ],
      },
      Ratings: {
        type: "radio",
        subFilter: [
          { title: "Rating 4.5+" },
          { title: "Rating 4.0+" },
          { title: "Rating 3.5+" },
        ],
      },
      "Veg/Non-Veg": {
        type: "radio",
        subFilter: [{ title: "Veg" }, { title: "Non Veg" }],
      },
      "Cost for two": {
        type: "checkbox",
        subFilter: [
          { title: "Rs. 300-Rs. 600" },
          { title: "Greater than Rs. 600" },
          { title: "Less than Rs. 300" },
        ],
      },
    },
  },
  reducers: {
    setCurrentRestaurant: (state, action) => {
      state.currentRestaurant = action.payload;
    },
  },
});

export default appSlice.reducer;
export const { setCurrentRestaurant } = appSlice.actions;
