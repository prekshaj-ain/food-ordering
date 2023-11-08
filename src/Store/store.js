import { configureStore } from "@reduxjs/toolkit";

import cartSlice from "./Slices/cartSlice";
import appSlice from "./Slices/appSlice";
import restaurantsSlice from "./Slices/restaurantsSlice";
import suggestionsSlice from "./Slices/suggestionsSlice";
import searchSlice from "./Slices/searchSlice";

const store = configureStore({
  reducer: {
    app: appSlice,
    cart: cartSlice,
    restaurants: restaurantsSlice,
    suggestions: suggestionsSlice,
    search: searchSlice,
  },
});

export default store;
