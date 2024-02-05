import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/forms.css';
import toast from 'react-hot-toast';
import authService from '../services/auth.service';
import Sidebar from './Sidebar.component';
import { useLocation } from 'react-router-dom';

const EditCategory = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const category = location.state && location.state.category;
    console.log('category:', category);

  const [formData, setFormData] = useState({
    name: '',
    status: ''
  });

  useEffect(() => {
    console.log('category:', category);
    // Check if subcat prop has data and set the initial values accordingly
    if (category) {
      console.log('Setting initial values');
      setFormData((prevData) => ({
        ...prevData,
        name: category.name || '',
        status: category.status || '',
      }));
    }
  }, [category]);
  
  useEffect(() => {
    console.log('formData:', formData);
  }, [formData]);

  const handleChange = (event) => {
    console.log('Handling change:', event.target.name, event.target.value);
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Include the id field in formData for the API call
    const formDataWithId = {
      ...formData,
      id: category.id || ''
    };

    console.log('Form data:', formDataWithId);

    try {
      const result = await authService.editCategory(formDataWithId);
      console.log('Backend response:', result);
      if (result) {
        toast.success('Update successful!');
        navigate('/category');
      }
    } catch (error) {
      console.log('Error during update:', error);
      toast.error('category update failed');
    }

    // Clear the form (excluding id from the form fields)
    setFormData({
      name: '',
      status: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div><Sidebar /></div>
      <div className='form-container'>
        <label>
          Category Name:
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

export default EditCategory;
