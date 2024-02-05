import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import authService from '../services/auth.service';
import Sidebar from './Sidebar.component';
import http from '../utils/http-client';

const AddService = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    category_name: '',
    subcategory_name: '',
    service_name: '',
    price_type: '',
    service_price: '',
    discount_price: '',
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

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        if (formData.category_name) {
          const result = await http.get(`subcat/getOne/${formData.category_name}`);
          setSubcategories(result.data); // Update subcategories state here
          console.log('Fetched subcategories:', subcategories);
        }
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };

    fetchSubCategories();
  }, [formData.category_name]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form data:', formData);

    try {
      console.log('before adding order', formData);
      const result = await authService.addService(formData);
      console.log('Backend response:', result.data);
      if (result.data) {
        toast.success('Service added successfully!');
        navigate('/service');
      }
    } catch (error) {
      console.log('Error during service addition:', error);
      toast.error('Service addition failed');
    }

    // Reset the form fields
    setFormData({
      category_name: '',
      subcategory_name: '',
      service_name: '',
      price_type: '',
      service_price: '',
      discount_price: '',
      status: '',
    });
  };

  return (
    <div className='card mrg_bottom'>
      <h3 className='p-2 bd-highlight'>Add new service</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <Sidebar />
        </div>
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

          {subcategories.length > 0 && (
            <label>
              Subcategory Name:
              <select
                name="subcategory_name"
                value={formData.subcategory_name}
                onChange={handleChange}
              >
                <option value=''>Select Subcategory</option>
                {subcategories.map((subcategory) => (
                  <option key={subcategory.id}   
                  value={subcategory.subcategory_name}>
                    {subcategory.subcategory_name}
                  </option>
                ))}
              </select>
            </label>
          )}

          <label>
            Service Name:
            <input type="text" name="service_name" value={formData.service_name} onChange={handleChange} />
          </label>

          <label>
            Price Type:
            <input type="text" name="price_type" value={formData.price_type} onChange={handleChange} />
          </label>

          <label>
            Service Price:
            <input type="text" name="service_price" value={formData.service_price} onChange={handleChange} />
          </label>

          <label>
            Discount Price:
            <input type="text" name="discount_price" value={formData.discount_price} onChange={handleChange} />
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

export default AddService;
