import React from 'react';
import toast from 'react-hot-toast';
import authService from '../services/auth.service';
import ErrorBoundary from './ErrorBoundary';
const DeleteService = ({ subcat ,onsubcatDeleted }) => {
  const [isDeleting, setDeleting] = React.useState(false);

  const handleClick = async () => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        setDeleting(true);
        // Call the deleteUser method from authService with the service id
      const subcatId=subcat;
      console.log(subcat);
        await authService.deleteSubcat(subcatId);
        toast.success('service deleted successfully');
        onsubcatDeleted(subcat);
        // Optionally, you can reload the service list or update the state accordingly
      } catch (error) {
        console.log(subcat.id);
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
