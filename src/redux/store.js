import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";

// Create the Redux store with cart and user reducers
const store = configureStore({
  reducer: {
    cart: cartReducer, // Manages the cart state
    user: userReducer, // Manages the user state
  },
});

export default store; // Export the store so it can be used in the app
