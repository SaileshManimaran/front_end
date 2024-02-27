import React, { useState } from 'react';
import toast from 'react-hot-toast';
import authService from '../../services/auth.service';

const DeleteCity = ({ city, onCityDeleted }) => {
  const [isDeleting, setDeleting] = useState(false);

  const handleClick = async () => {
    if (window.confirm('Are you sure you want to delete this city?')) {
      try {
        setDeleting(true);
        const cityId = city.id;
        // Assuming authService.deleteCity is the appropriate method for deleting a city
        await authService.deleteCity(cityId);
        toast.success('City deleted successfully');
        onCityDeleted(cityId);
      } catch (error) {
        toast.error('Error deleting city');
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

export default DeleteCity;
