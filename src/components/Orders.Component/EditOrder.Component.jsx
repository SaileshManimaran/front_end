import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import authService from '../../services/auth.service';
import Sidebar from '../Sidebar.component';

const EditOrderComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state && location.state.order;

  const [formData, setFormData] = useState({
    id: '',
    user_name: '',
    category_name: '',
    vendor: '',
    contactNumber: '',
    created_at: '',
    time_schedule: '',
    deliveredAmount: '',
    decision: '',
    customer_id: '',
  });

  useEffect(() => {
    if (order) {
      setFormData({
        id: order.id || '',
        user_name: order.user_name || '',
        category_name: order.category_name || '',
        vendor: order.vendor || '',
        contactNumber: order.contactNumber || '',
        created_at: order.created_at || '',
        time_schedule: order.time_schedule || '',
        deliveredAmount: order.deliveredAmount || '',
        decision: order.decision || '',
        customer_id: order.customer_id || '',
      });
    }
  }, [order]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await authService.editOrder(formData);
      if (result) {
        toast.success('Update successful!');
        navigate('/order');
      }
    } catch (error) {
      console.log('Error during update:', error);
      toast.error('Order update failed');
    }
  };

  return (
    <div>
      <Sidebar />
      <form onSubmit={handleSubmit}>
        <label>
          User Name:
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
          <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
        </label>

        <label>
          Created At:
          <input type="text" name="created_at" value={formData.created_at} onChange={handleChange} />
        </label>

        <label>
          Time Schedule:
          <input type="text" name="time_schedule" value={formData.time_schedule} onChange={handleChange} />
        </label>

        <label>
          Delivered Amount:
          <input type="text" name="deliveredAmount" value={formData.deliveredAmount} onChange={handleChange} />
        </label>

        <label>
          Decision:
          <input type="text" name="decision" value={formData.decision} onChange={handleChange} />
        </label>

        {/* Add more input fields for other order details */}
        
        <button type="submit">Update Order</button>
      </form>
    </div>
  );
};

export default EditOrderComponent;
