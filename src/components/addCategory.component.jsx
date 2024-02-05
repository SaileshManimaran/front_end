import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/addUser.css';
import '../styles/forms.css';
import toast from 'react-hot-toast';
import authService from '../services/auth.service';
import Sidebar from './Sidebar.component';
const UserForm = () => {
  const navigate=useNavigate();
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
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form data:', formData);
    try {
      const result = await authService.addCategory(formData);
      console.log('Backend response:', result.data);
      if (result.data) {
        toast.success('Added successfuly!');
        navigate('/category');
      }
    } catch (error) {
      console.log('Error during registration:', error);
      toast.error('failed');
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
        Status:
        <input type="text" name="status" value={formData.status} onChange={handleChange} />
      </label>

    

    

      <button type="submit">Submit</button>
      </div>
  
    </form>
  );
};

export default UserForm;
