import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <h1>Welcome to Character Candles!</h1>
      <p>
        Dive into a world of enchantment with our exclusive collection of
        candles inspired by your favorite Baldur's Gate 3 characters. Each
        candle is crafted to capture the essence of these beloved companions,
        offering unique scents that will transform your space into a magical
        haven.
      </p>
      <p>
        Whether you're seeking a cozy, calming atmosphere or a touch of
        adventure, our candles bring the spirit of the game right into your
        home. Explore our range and find the perfect candle to light up your
        moments.
      </p>
      <div className="landing-buttons">
        {/* Button to navigate to the products page */}
        <Link to="/products">
          <Button variant="success" className="m-2">
            View Products
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
