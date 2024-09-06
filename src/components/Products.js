import React, { useState } from "react";
import {
  Card,
  Button,
  Dropdown,
  DropdownButton,
  Row,
  Col,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../redux/cartSlice";
import "./Products.css";

const Products = () => {
  const [selectedSize, setSelectedSize] = useState({});
  const dispatch = useDispatch();

  // List of products to display
  const products = [
    {
      id: 1,
      title: "The Pale Elf",
      description:
        "For warmth and wonder, a pleasant mix of Bergamot, Rosemary and Brandy.",
      imgSrc: "/products/Product1.jpg",
    },
    {
      id: 2,
      title: "The Wizard of Waterdeep",
      description:
        "Netherese Void and The Weave's Aura, a magical mix of Seaside Air and Books",
      imgSrc: "/products/Product2.jpg",
    },
    {
      id: 3,
      title: "Archdruid of Emerald Grove",
      description:
        "Natures touch, a strong mix of Iris Root, Forest Air, Dried Herbs and Green Leaves",
      imgSrc: "/products/Product3.jpg",
    },
    {
      id: 4,
      title: "Paladin of the Underdark",
      description:
        "True soul of the Absolute, a daring mix of Charcoal, Clove, Saffron and Violet.",
      imgSrc: "/products/Product4.jpg",
    },
  ];

  // Define prices for different sizes
  const sizePrices = {
    Small: 250,
    Large: 450,
  };

  // Handle size selection for each product
  const handleSizeSelect = (productID, size) => {
    setSelectedSize((prev) => ({ ...prev, [productID]: size }));
  };

  // Handle adding the item to the cart
  const handleBuy = (product) => {
    const size = selectedSize[product.id] || "Small"; // Default to "Small" if no size selected
    const price = sizePrices[size]; // Get the price based on the selected size
    dispatch(addItemToCart({ ...product, size, price }));
  };

  return (
    <div>
      <Row>
        {products.map((product) => {
          const size = selectedSize[product.id] || "Small"; // Default size
          const price = sizePrices[size]; // Get the price based on size

          return (
            <Col sm={12} md={6} lg={4} key={product.id}>
              <Card className="mb-4">
                <Card.Img variant="top" src={product.imgSrc} />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <Card.Text>
                    <strong>R {price.toFixed(2)}</strong>{" "}
                    {/* Display price based on selected size */}
                  </Card.Text>
                  <DropdownButton
                    id="dropdown-basic-button"
                    title="Choose a size"
                    onSelect={(size) => handleSizeSelect(product.id, size)}
                  >
                    <Dropdown.Item eventKey="Small">Small</Dropdown.Item>
                    <Dropdown.Item eventKey="Large">Large</Dropdown.Item>
                  </DropdownButton>
                  <Button
                    className="mt-2"
                    variant="primary"
                    onClick={() => handleBuy(product)}
                  >
                    Buy
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Products;
