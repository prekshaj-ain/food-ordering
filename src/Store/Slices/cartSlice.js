import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    restaurant: null,
    items: [],
    quantities: [],
    subTotal: 0,
  },
  reducers: {
    addItem: (state, action) => {
      state.restaurant = action.payload.restaurant;
      state.items.push(action.payload.item);
      state.quantities.push(action.payload.quantity);
      state.subTotal += action.payload.item.price * action.payload.quantity;
    },
    updateQuantity: (state, action) => {
      let index = state.items.findIndex((item) => item.id == action.payload.id);
      if (index !== -1) {
        state.quantities[index] = action.payload.quantity;
        state.subTotal = state.items.reduce((total, item, index) => {
          return total + item.price * state.quantities[index];
        }, 0);
      }
    },
    removeItem: (state, action) => {
      let index = state.items.findIndex((item) => item.id == action.payload);
      if (index !== -1) {
        state.items.splice(index, 1);
        state.quantities.splice(index, 1);
      }
      if (state.items.length == 0) state.restaurant = null;
    },
    clearCart: (state) => {
      state.items = [];
      state.quantities = [];
      state.restaurant = null;
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
