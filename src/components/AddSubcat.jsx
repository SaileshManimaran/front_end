import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/addUser.css';
import '../styles/forms.css';
import toast from 'react-hot-toast';
import authService from '../services/auth.service';
import Sidebar from './Sidebar.component';
const UserForm = () => {
  const [categories, setCategories] = useState([]);

  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    category_name: '',
    subcategory_name:'',
        status: '',
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await authService.getCategory();
        setCategories(result.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);
  
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
      const result = await authService.addSubcat(formData);
      console.log('Backend response:', result.data);
      if (result.data) {
        toast.success('Registration successful!');
        navigate('/subCategory');
      }
    } catch (error) {
      console.log('Error during registration:', error);
      toast.error('User registration failed');
    }
    setFormData({
        category_name: '',
        subcategory_name:'',
        status: '',
     
       
    });
  };
  
  

  return (
      <div className='card mrg_bottom' >
        <h3 className='p-2 bd-highlight'>Add new Subcategory</h3>
    <form onSubmit={handleSubmit}>
      <div><Sidebar/></div>
     <div>
     <label>
            Category Name:
            <select
              name="category_name"
              value={formData.category_name}
              onChange={handleChange}
            >
              <option value=''>Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>

      <label>
        Subcategory Name:
        <input type="text" name="subcategory_name" value={formData.subcategory_name} onChange={handleChange} />
      </label>
      
    <label>
      Status:
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value=''>Select status</option>
              
                <option  value="Approved">Approved</option>
                <option  value="Not Approved">Not Approved</option>

            </select>
          </label>

  

<button type="submit">Submit</button>
      </div>
    </form>
    </div>
  );
};

export default UserForm;
