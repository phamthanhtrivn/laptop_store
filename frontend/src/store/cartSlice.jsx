import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item._id === product._id);
      if (existingItem) {
        state.items = state.items.map((item) => {
          if (item._id === product._id) {
            return { ...item, quantity: item.quantity + product.quantity };
          } else {
            return item;
          }
        });
      } else {
        state.items.push({ ...product, quantity: product.quantity });
      }
      state.totalQuantity += product.quantity;
      state.totalPrice += product.price * product.quantity;
    },
    removeItem: (state, action) => {
      const productID = action.payload;
      const product = state.items.find((item) => item._id === productID);
      state.items = state.items.filter((item) => item._id !== productID);
      state.totalQuantity -= product.quantity;
      state.totalPrice -= product.price * product.quantity;
    },
    updateQuantity: (state, action) => {
      const { productID, quantity } = action.payload;
      const product = state.items.find((item) => item._id === productID);
      if (product) {
        state.items = state.items.map((item) => {
          if (item._id === product._id) {
            const newQuantity = Math.max(1, item.quantity + quantity);
            return { ...item, quantity: newQuantity };
          } else {
            return item;
          }
        });
      }
      state.totalQuantity = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    }
  },
});

export const { addToCart, removeItem, updateQuantity, clearCart } = cartSlice.actions;  
export default cartSlice.reducer;
