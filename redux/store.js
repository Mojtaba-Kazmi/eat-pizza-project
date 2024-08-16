import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice" // Ensure correct path

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
