import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Products from "./components/Products";
import Login from "./components/Login";
import Register from "./components/Register";
import NavigationMenu from "./components/NavigationMenu";
import Cart from "./components/Cart";
import LandingPage from "./components/LandingPage";
import { useSelector } from "react-redux";
import "./App.css";

const App = () => {
  // Get user information from the Redux store
  const user = useSelector((state) => state.user);

  return (
    <Router>
      {/* Display the header and navigation menu */}
      <Header />
      <NavigationMenu />

      <Routes>
        {/* Route for the landing page */}
        <Route path="/" element={<LandingPage />} />

        {/* Route for the products page */}
        {/* If user is logged in, show Products component; otherwise, redirect to login */}
        <Route
          path="/products"
          element={user.firstName ? <Products /> : <Navigate to="/login" />}
        />

        {/* Route for the cart page */}
        {/* If user is logged in, show Cart component; otherwise, redirect to login */}
        <Route
          path="/cart"
          element={user.firstName ? <Cart /> : <Navigate to="/login" />}
        />

        {/* Route for the login page */}
        {/* If user is already logged in, redirect to the home page */}
        <Route
          path="/login"
          element={user.firstName ? <Navigate to="/" /> : <Login />}
        />

        {/* Route for the registration page */}
        {/* If user is already logged in, redirect to the home page */}
        <Route
          path="/register"
          element={user.firstName ? <Navigate to="/" /> : <Register />}
        />
      </Routes>
    </Router>
  );
};

export default App;
