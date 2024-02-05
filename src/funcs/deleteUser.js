import React from 'react';
import toast from 'react-hot-toast';
import authService from '../services/auth.service';
import ErrorBoundary from '../funcs/ErrorBoundary';
const DeleteUser = ({ user ,onUserDeleted }) => {
  const [isDeleting, setDeleting] = React.useState(false);

  const handleClick = async () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        setDeleting(true);
        // Call the deleteUser method from authService with the user id
       const userId=user.id;
        await authService.deleteUser({ userId });
        toast.success('User deleted successfully');
        onUserDeleted(userId);
        // Optionally, you can reload the user list or update the state accordingly
      } catch (error) {
        console.log(user.id);
        toast.error('Error deleting user');
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


export default DeleteUser;
