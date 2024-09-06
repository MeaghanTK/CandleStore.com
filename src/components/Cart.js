import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setShippingCost } from "../redux/cartSlice";
import ShippingInfo from "./ShippingInfo";
import "./Cart.css";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const shippingCost = useSelector((state) => state.cart.shippingCost); // Get current shipping cost
  const dispatch = useDispatch();
  const [shipping, setShipping] = useState("standard");
  const [showPopup, setShowPopup] = useState(false);

  const handleShippingChange = (event) => {
    const selectedShipping = event.target.value;
    setShipping(selectedShipping);

    // Set the shipping cost based on the selected option
    let shippingCost = 0;
    if (selectedShipping === "standard") {
      shippingCost = 50; // ZAR 50 for standard
    } else if (selectedShipping === "express") {
      shippingCost = 100; // ZAR 100 for express
    } else if (selectedShipping === "overnight") {
      shippingCost = 150; // ZAR 150 for overnight
    }

    // Dispatch action to update shipping cost
    dispatch(setShippingCost(shippingCost));
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>

      {/* Dropdown menu for shipping options */}
      <div className="shipping-options">
        <label htmlFor="shipping">Choose a shipping option:</label>
        <select id="shipping" value={shipping} onChange={handleShippingChange}>
          <option value="standard">Standard Shipping - ZAR 50</option>
          <option value="express">Express Shipping - ZAR 100</option>
          <option value="overnight">Overnight Shipping - ZAR 150</option>
        </select>

        {/* Info button to trigger the popup */}
        <button className="info-button" onClick={togglePopup}>
          Shipping Info
        </button>
      </div>

      {/* Conditionally render the ShippingInfo */}
      {showPopup && <ShippingInfo togglePopup={togglePopup} />}

      {/* Render cart items */}
      <div className="cart-items">
        {cartItems.length === 0 ? (
          <p>Cart empty!</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <p>{item.title}</p>
              <p>Size: {item.size}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ZAR {item.price ? item.price.toFixed(2) : "N/A"}</p>
            </div>
          ))
        )}
      </div>

      {/* Render total amount if cart is not empty */}
      {cartItems.length > 0 && (
        <div className="cart-total">
          <p>Shipping: ZAR {shippingCost.toFixed(2)}</p>
          <p>Total: ZAR {totalAmount ? totalAmount.toFixed(2) : "N/A"}</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
