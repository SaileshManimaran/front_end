import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../../styles/addUser.css';
import '../../styles/forms.css';
import toast from 'react-hot-toast';
import authService from '../../services/auth.service';
import Sidebar from '../Sidebar.component';
const UserForm = () => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    name: '',
      number: '',
      houseNo: '',
      address:'',
      landmark:'',
        city:'',
        pincode:'',
      status:''
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
      const result = await authService.addAddress(formData);
      console.log('Backend response:', result.data);
      if (result.data) {
        toast.success('Registration successful!');
        navigate('/address');
      }
    } catch (error) {
      console.log('Error during registration:', error);
      toast.error('User registration failed');
    }
    setFormData({
      name: '',
      number: '',
      houseNo: '',
      address:'',
      landmark:'',
        city:'',
        pincode:'',
      status: ''
    });
  };
  
  const handleGoBack = () => {
    navigate('/address'); // Go back one step in history
  };

  return (
    <form onSubmit={handleSubmit}>
      <div><Sidebar/></div>
     <div className='form-container'>  <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>

      

      <label>
        Contact Number:
        <input type="tel" name="number" value={formData.number} onChange={handleChange} />
      </label>

      <label>
        House No:
        <input type="text" name="houseNo" value={formData.houseNo} onChange={handleChange} />
      </label>

      <label>
        Address:
        <input type="text" name="address" value={formData.address} onChange={handleChange} />
      </label>
      <label>
        Landmark:
        <input type="text" name="landmark" value={formData.landmark} onChange={handleChange} />
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
      <div>
      <button type=" btn btn-success button" onClick={handleGoBack}>Back</button>
        <button type="submit" style={{ marginLeft:"210px"}} >Submit</button>
      </div>
    </form>
  );
};

export default UserForm;
