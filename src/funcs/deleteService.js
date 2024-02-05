import React from 'react';
import toast from 'react-hot-toast';
import authService from '../services/auth.service';
import ErrorBoundary from './ErrorBoundary';
const DeleteService = ({ service ,onServiceDeleted }) => {
  const [isDeleting, setDeleting] = React.useState(false);

  const handleClick = async () => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        setDeleting(true);
        // Call the deleteUser method from authService with the service id
      const serviceId=service;
      console.log(service);
        await authService.deleteService(serviceId);
        toast.success('service deleted successfully');
        onServiceDeleted(service);
        // Optionally, you can reload the service list or update the state accordingly
      } catch (error) {
        console.log(service.id);
        toast.error('Error deleting service');
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


export default DeleteService;
