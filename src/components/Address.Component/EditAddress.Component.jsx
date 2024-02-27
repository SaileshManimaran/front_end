import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import authService from '../../services/auth.service'; // Update the path accordingly
import Sidebar from '../Sidebar.component';

const EditAddress = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const address = location.state && location.state.address;

  const [formData, setFormData] = useState({
    type: '',
    name: '',
    number: '',
    houseNo: '',
    landmark: '',
    addressLine: '',
    city: '',
    pincode: '',
    status: '',
  });

  useEffect(() => {
    if (address) {
      setFormData((prevData) => ({
        ...prevData,
        type: address.type || '',
        name: address.name || '',
        number: address.number || '',
        houseNo: address.houseNo || '',
        landmark: address.landmark || '',
        address: address.address || '',
        city: address.city || '',
        pincode: address.pincode || '',
        status: address.status || '',
      }));
    }
  }, [address]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataWithId = {
      ...formData,
      id: address.id || '',
    };

    try {
      const result = await authService.editAddress(formDataWithId);
      if (result) {
        toast.success('Address update successful!');
        navigate('/address');
      }
    } catch (error) {
      console.log('Error during update:', error);
      toast.error('Address update failed');
    }

    // Clear the form fields after submission
    setFormData({
      type: '',
      name: '',
      number: '',
      houseNo: '',
      landmark: '',
      address: '',
      city: '',
      pincode: '',
      status: '',
    });
  };
  const handleGoBack = () => {
    navigate('/address'); // Go back one step in history
  };

  return (
    <form onSubmit={handleSubmit}>
      <Sidebar />
      <div className="form-container">
        <label>
          Type:
          <input type="text" name="type" value={formData.type} onChange={handleChange} />
        </label>

        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>

        <label>
          Number:
          <input type="text" name="number" value={formData.number} onChange={handleChange} />
        </label>

        <label>
          House No:
          <input type="text" name="houseNo" value={formData.houseNo} onChange={handleChange} />
        </label>

        <label>
          Landmark:
          <input type="text" name="landmark" value={formData.landmark} onChange={handleChange} />
        </label>

        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
        </label>

        <label>
          City:
          <input type="text" name="city" value={formData.city} onChange={handleChange} />
        </label>

        <label>
          Pincode:
          <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} />
        </label>

        <label>
          Status:
          <input type="text" name="status" value={formData.status} onChange={handleChange} />
        </label>

      </div>
      <div >
        <button type=" btn btn-success button" onClick={handleGoBack}>Back</button>
        <button type="submit" style={{ marginLeft:"210px"}} >Submit</button>
      </div>
    </form>
  );
};

export default EditAddress;
