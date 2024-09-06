import { createSlice } from "@reduxjs/toolkit";

// Initial state for user slice
const initialState = {
  firstName: "",
  surname: "",
  email: "",
};

// Create user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Action to set user information
    setUser: (state, action) => {
      state.firstName = action.payload.firstName;
      state.surname = action.payload.surname;
      state.email = action.payload.email;
    },
    // Action to clear user information
    clearUser: (state) => {
      state.firstName = "";
      state.surname = "";
      state.email = "";
    },
  },
});

// Export actions
export const { setUser, clearUser } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
