import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Access the current user state from the Redux store
  const user = useSelector((state) => state.user);

  // Handle user logout
  const handleLogout = () => {
    // Clear user data from Redux store
    dispatch(clearUser());
    // Remove the logged-in status from local storage
    localStorage.removeItem("isLoggedIn");
    // Redirect to the login page
    navigate("/login");
  };

  return (
    <header>
      {/* Display a welcome message with the user's first name if available */}
      <h1>Welcome{user.firstName ? `, ${user.firstName}` : ""}!</h1>
      {/* Show logout button only if the user is logged in */}
      {user.firstName && <button onClick={handleLogout}>Logout</button>}
    </header>
  );
};

export default Header;
