import { createSlice } from "@reduxjs/toolkit";

// Create a slice for managing cart state
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Items currently in the cart
    shippingCost: 0, // Current shipping cost
    totalAmount: 0, // Total cost of items in the cart
  },
  reducers: {
    // Add an item to the cart
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += newItem.quantity; // If item exists, increase the quantity
      } else {
        state.items.push({ ...newItem, quantity: 1 }); // Add new item to cart with quantity 1
      }

      // Recalculate the total amount
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    // Remove an item from the cart
    removeItemFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);

      // Recalculate the total amount after removing item
      state.totalAmount =
        state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ) + state.shippingCost;
    },
    // Set the shipping cost and recalculate the total amount
    setShippingCost(state, action) {
      state.shippingCost = action.payload;

      // Recalculate the total amount with the shipping cost
      state.totalAmount =
        state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ) + state.shippingCost;
    },
  },
});

// Export the actions so components can dispatch them
export const { addItemToCart, removeItemFromCart, setShippingCost } =
  cartSlice.actions;

// Export the reducer to be included in the store
export default cartSlice.reducer;
