import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./Slices/cartSlice";
import appSlice from "./Slices/appSlice";
import restaurantsSlice from "./Slices/restaurantsSlice";

const store = configureStore({
  reducer: {
    app: appSlice,
    cart: cartSlice,
    restaurants: restaurantsSlice,
  },
});

export default store;
