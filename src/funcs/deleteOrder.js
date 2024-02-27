import React from 'react';
import toast from 'react-hot-toast';
import authService from '../services/auth.service';
import ErrorBoundary from './ErrorBoundary';
import { redirect,useNavigate } from 'react-router-dom';
const DeleteOrder = ({ order ,onOrderDeleted }) => {
  const [isDeleting, setDeleting] = React.useState(false);

  const handleClick = async () => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        setDeleting(true);
        // Call the deleteUser method from authService with the order id
       const orderId=order.id;
        await authService.deleteOrder({ orderId });
        toast.success('Order deleted successfully');
       
        onOrderDeleted(orderId);
        // Optionally, you can reload the order list or update the state accordingly
      } catch (error) {
        console.log(order.id);
        // toast.error('Error deleting order');
        console.log(error);
      } finally {
        setDeleting(false);
      }
    }
  };

  return (
   
    <button onClick={handleClick} disabled={isDeleting} className='deleteButton'>
      {isDeleting ? 'Deleting...' : 'Delete'}
    </button>
   
  );
};


export default DeleteOrder;
