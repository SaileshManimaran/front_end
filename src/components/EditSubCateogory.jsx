import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/forms.css';
import toast from 'react-hot-toast';
import authService from '../services/auth.service';
import Sidebar from './Sidebar.component';
import { useLocation } from 'react-router-dom';

const EditSubCategoryComponent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const subcat = location.state && location.state.subcat;
    console.log('subcat prop:', subcat);

  const [formData, setFormData] = useState({
    category_name: '',
    subcategory_name: '',
    status: ''
  });

  useEffect(() => {
    console.log('subcat:', subcat);
    // Check if subcat prop has data and set the initial values accordingly
    if (subcat) {
      console.log('Setting initial values');
      setFormData((prevData) => ({
        ...prevData,
        category_name: subcat.category_name || '',
        subcategory_name: subcat.subcategory_name || '',
        status: subcat.status || '',
      }));
    }
  }, [subcat]);
  
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
      id: subcat.id || ''
    };

    console.log('Form data:', formDataWithId);

    try {
      const result = await authService.editSubcat(formDataWithId);
      console.log('Backend response:', result);
      if (result) {
        toast.success('Update successful!');
        navigate('/subCategory');
      }
    } catch (error) {
      console.log('Error during update:', error);
      toast.error('Subcategory update failed');
    }

    // Clear the form (excluding id from the form fields)
    setFormData({
      category_name: '',
      subcategory_name: '',
      status: ''
    });
  };const handleGoBack = () => {
    navigate('/subcategory'); // Go back one step in history
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div><Sidebar /></div>
      <div className='form-container'>
        <label>
          Category Name:
          <input type="text" name="category_name" value={formData.category_name} onChange={handleChange} />
        </label>

        <label>
          Subcategory Name:
          <input type="text" name="subcategory_name" value={formData.subcategory_name} onChange={handleChange} />
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

export default EditSubCategoryComponent;
