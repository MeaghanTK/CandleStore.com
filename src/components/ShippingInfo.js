import React from "react";
import { Modal, Button } from "react-bootstrap";

// Component for the info icon and the popup with shipping instructions
const ShippingInfo = ({ showPopup, togglePopup }) => {
  return (
    <>
      {/* Modal that shows shipping information */}
      <Modal show={showPopup} onHide={togglePopup} centered>
        <Modal.Header closeButton>
          <Modal.Title>Shipping Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* List of shipping options and delivery times */}
          <ul>
            <li>Standard Shipping: 5-7 Business Days</li>
            <li>Express Shipping: 2-3 Business Days</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          {/* Button to close the popup */}
          <Button variant="secondary" onClick={togglePopup}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ShippingInfo;
