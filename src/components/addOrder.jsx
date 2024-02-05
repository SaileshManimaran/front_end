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
    user_name: '',
    category_name:'',
    vendor: '',
    contactNumber: '',
    deliveredAmount:'',
    decision:'',
   time_schedule:''
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
      console.log("before adding order" ,formData);
      const result = await authService.addOrder(formData);
      console.log('Backend response:', result.data);
      if (result.data) {
        toast.success('Registration successful!');
        navigate('/order');
      }
    } catch (error) {
      console.log('Error during registration:', error);
      toast.error('User registration failed');
    }
    setFormData({
      user_name: '',
      category_name:'',
      vendor: '',
      contactNumber: '',
      deliveredAmount:'',
      decision:'',
     time_schedule:'' 
       
    });
  };
  
  

  return (
      <div className='card mrg_bottom' >
        <h3 className='p-2 bd-highlight'>Add new order</h3>
    <form onSubmit={handleSubmit}>
      <div><Sidebar/></div>
     <div> <label>
        Name:
        <input type="text" name="user_name" value={formData.user_name} onChange={handleChange} />
      </label>
    <label>
     Category Name:
        <input type="text" name="category_name" value={formData.category_name} onChange={handleChange} />
      </label>

      <label>
        Vendor:
        <input type="text" name="vendor" value={formData.vendor} onChange={handleChange} />
      </label>
      

      <label>
        Contact Number:
        <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
      </label>

  
      <label>
       Amount:
        <input type="text" name="deliveredAmount" value={formData.deliveredAmount} onChange={handleChange} />
      </label>


      <label>
        Decision:
        <input type="text" name="decision" value={formData.decision} onChange={handleChange} />
      </label>

      <label>
  Time Schedule:
  <select
    name="time_schedule"
    value={formData.time_schedule}
    onChange={handleChange}
  >
    <option value="">Select Schedule</option>
    <option value="08:00-12:00">8:00 AM - 12:00 PM</option>
    <option value="12:00-18:00">12:00 PM - 6:00 PM</option>
    <option value="18:00-22:00">6:00 PM - 10:00 PM</option>
    {/* Add more options as needed */}
  </select>
</label>

      

  

      

      <button type="submit">Submit</button>
      </div>
    </form>
    </div>
  );
};

export default UserForm;
