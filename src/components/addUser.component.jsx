import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/addUser.css';
import '../styles/forms.css';
import toast from 'react-hot-toast';
import authService from '../services/auth.service';
import Sidebar from './Sidebar.component';
const UserForm = () => {
  const navigate=useNavigate();
  const [validationError, setValidationError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    password: '',
    status: '',
    role: ''
  });
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'contactNumber' && value.length !== 10) {
      setValidationError('Contact number must have 10 digits');
    } else {
      setValidationError('');
    }
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form data:', formData);
    try {
      const result = await authService.addUser(formData);
      console.log('Backend response:', result.data);
      if (result.data) {
        toast.success('Registration successful!');
        navigate('/users');
      }
    } catch (error) {
      console.log('Error during registration:', error);
      toast.error('User registration failed');
    }
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
     <div className='form-container'>  <label>
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
      {validationError && <p className="error-message">{validationError}</p>}


      <label>
        Password:
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
      </label>

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

export default UserForm;
