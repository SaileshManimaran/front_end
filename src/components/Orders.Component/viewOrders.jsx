import React from 'react';
import Card from 'react-bootstrap/Card';
import { useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar.component';
import { Link } from 'react-router-dom'; // Import useNavigate
import DeleteOrder from '../../funcs/deleteOrder';
import { useNavigate } from 'react-router-dom';


const ViewOrder = () => {
  // Fetch the order details based on the orderId (you may need to modify this logic)
  const location = useLocation();
  const orderDetails = location.state?.orderDetails || null;
  

  const RedirectToEditOrder = ({ order }) => {
    const navigate = useNavigate();
  
    const handleClick = () => {
      navigate('/editOrder', { state: { order } });
    };
  
    return <button onClick={handleClick} className='editButton'>Edit Order</button>;
  };
  if (!orderDetails) {
    return <div>Loading...</div>; // or handle the case where orderDetails is not available
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div><Sidebar /></div>
      <div style={{ textAlign: "center" }}>
        <Card >
          <Card.Header as="h5">Order Details</Card.Header>
          <Card.Body>
            <Card.Title>Order ID: {orderDetails.id}</Card.Title>
            <Card.Text>
              <strong>Service:</strong> {orderDetails.category_name}
            </Card.Text>
            <Card.Text>
              <strong>Total Amount:</strong> ${orderDetails.deliveredAmount}
            </Card.Text>
            {/* Add more details as needed */}
          </Card.Body>
          <RedirectToEditOrder order={orderDetails}/>
          <DeleteOrder order={orderDetails}/>
        </Card>
      </div>
    </div>
  );
};

export default ViewOrder;
