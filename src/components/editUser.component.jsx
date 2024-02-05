import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/addUser.css';
import '../styles/forms.css';
import toast from 'react-hot-toast';
import authService from '../services/auth.service';
import Sidebar from './Sidebar.component';
import { useLocation } from 'react-router-dom';

const EditUserComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state && location.state.user;

  const [formData, setFormData] = useState({

    name: '',
    email: '',
    contactNumber: '',
    password: '',
    status: '', // Assuming you have status and role fields
    role: ''
  });

  useEffect(() => {
    // Check if user prop has data and set the initial values accordingly
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        name: user.name || '',
        email: user.email || '',
        contactNumber: user.contactNumber || '',
        password: user.password || '',
        status: user.status || '',
        role: user.role || ''
      }));
    }
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
  event.preventDefault();
  
  // Include the id field in formData for the API call
  const formDataWithId = {
    ...formData,
    id: user.id || ''
  };

  console.log('Form data:', formDataWithId);

  try {
    const result = await authService.editUser(formDataWithId);
    console.log('Backend response:', result);
    if (result) {
      toast.success('Update successful!');
      navigate('/users');
    }
  } catch (error) {
    console.log('Error during update:', error);
    toast.error('User update failed');
  }

  // Clear the form (excluding id from the form fields)
  setFormData({
    name: '',
    email: '',
    contactNumber: '',
    password: '',
    status: '',
    role: ''
  });
};


  return (
    <form onSubmit={handleSubmit}>
      <div><Sidebar/></div>
      <div className='form-container'>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>

        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>

        <label>
          Contact Number:
          <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
        </label>

        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>

        {/* Assuming you have status and role fields */}
        <label>
          Status:
          <input type="text" name="status" value={formData.status} onChange={handleChange} />
        </label>

        <label>
          Role:
          <input type="text" name="role" value={formData.role} onChange={handleChange} />
        </label>

        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default EditUserComponent;
