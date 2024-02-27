import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import http from '../../utils/http-client';
import authService from '../../services/auth.service'
import Sidebar from '../Sidebar.component';

const AddCity = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    cityName: '',
    status: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const result = await authService.addCity(formData);
      if (result && result.data) {
        toast.success('City added successfully!');
        navigate('/city');
      } else {
        // Handle error cases where result is not as expected
        toast.error('Error adding city');
      }
    } catch (error) {
      console.error('Error during city addition:', error);
      toast.error('City addition failed');
    }
  
    // Reset the form fields
    setFormData({
      cityName: '',
      status: '',
    });
  };
  const handleGoBack = () => {
    navigate("/city"); // Go back one step in history
  };
  return (
    <form onSubmit={handleSubmit} style={{marginTop:"40px"}}>
      <div><Sidebar/></div>
        <h3 className='p-2 bd-highlight'>Add new city</h3>
        <div className='form-container'>
          <label>
            City Name:
            <input type="text" name="cityName" value={formData.cityName} onChange={handleChange} />
          </label>

          <label>
            Status:
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value=''>Select status</option>
              <option value="enabled">Enable</option>
              <option value="disabled">Disable</option>
            </select>
          </label>

        </div>
        <div >
        <button type=" btn btn-success button" onClick={handleGoBack}>Back</button>
        <button type="submit" style={{ marginLeft:"210px"}} >Submit</button>
      </div>
      </form>
  
  );
};

export default AddCity;
