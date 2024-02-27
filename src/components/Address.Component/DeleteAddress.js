import React, { useState } from 'react';
import toast from 'react-hot-toast';
import authService from '../../services/auth.service';

const DeleteAddress = ({ address, onAddressDeleted }) => {
  const [isDeleting, setDeleting] = useState(false);

  const handleClick = async () => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        setDeleting(true);
        const addressId = address.id;
        await authService.deleteAddress(addressId);
        toast.success('Address deleted successfully');
        onAddressDeleted(addressId);
      } catch (error) {
        toast.error('Error deleting address');
        console.error(error);
      } finally {
        setDeleting(false);
      }
    }
  };

  return (
    <button onClick={handleClick} disabled={isDeleting} className="deleteButton">
      {isDeleting ? 'Deleting...' : 'Delete'}
    </button>
  );
};

export default DeleteAddress;
