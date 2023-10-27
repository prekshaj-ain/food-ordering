import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./Slices/cartSlice";
import appSlice from "./Slices/appSlice";

const store = configureStore({
  reducer: {
    app: appSlice,
    cart: cartSlice,
  },
});

export default store;
