import React from 'react';
import Card from 'react-bootstrap/Card';
import { useLocation } from 'react-router-dom';


const ViewOrder = ({ }) => {
  // Fetch the order details based on the orderId (you may need to modify this logic)
const location = useLocation();
  const orderDetails = location.state?.orderDetails || null;
  console.log(orderDetails);
  if (!orderDetails) {
    console.log(orderDetails);
    return <div>Loading...</div>; // or handle the case where orderDetails is not available
  }

  return (
    <Card>
      <Card.Header as="h5">Order Details</Card.Header>
      <Card.Body>
        <Card.Title>Order ID: {orderDetails.id}</Card.Title>
        <Card.Text>
          <strong>Servive:</strong> {orderDetails.category_name}
        </Card.Text>
        <Card.Text>
          <strong>Total Amount:</strong> ${orderDetails.deliveredAmount}
        </Card.Text>
        {/* Add more details as needed */}
      </Card.Body>
    </Card>
  );
};

export default ViewOrder;
