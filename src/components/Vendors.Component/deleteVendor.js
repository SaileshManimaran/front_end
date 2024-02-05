import React, { useState } from 'react';
import toast from 'react-hot-toast';
import authService from '../../services/auth.service';

const DeleteVendor = ({ vendor, onVendorDeleted }) => {
  const [isDeleting, setDeleting] = useState(false);

  const handleClick = async () => {
    if (window.confirm('Are you sure you want to delete this vendor?')) {
      try {
        setDeleting(true);
        const vendorId = vendor.id;
        await authService.deleteVendor(vendorId);
        toast.success('Vendor deleted successfully');
        onVendorDeleted(vendorId);
      } catch (error) {
        toast.error('Error deleting vendor');
        console.error(error);
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

export default DeleteVendor;
