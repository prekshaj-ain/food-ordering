import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    restaurant: null,
    items: [],
    quantities: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.restaurant = action.payload.restaurant;
      state.items.push(action.payload.item);
      state.quantities.push(action.payload.quantity);
    },
    updateQuantity: (state, action) => {
      let index = items.find((item) => item === action.payload.item);
      if (index !== -1) {
        state.quantities[index] = action.payload.quantity;
      }
    },
    removeItem: (state, action) => {
      let index = items.find((item) => item === action.payload);
      if (index !== -1) {
        state.items.splice(index, 1);
        state.quantities.splice(index, 1);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.quantities = [];
      state.restaurant = null;
      state.deliveryCharge = 0;
    },
  },
});

export default cartSlice.reducer;
export const {
  addItem,
  addDeliveryCharge,
  updateQuantity,
  removeItem,
  clearCart,
} = cartSlice.actions;
