import React, { useState ,useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/forms.css';
import toast from 'react-hot-toast';
import authService from '../../services/auth.service'; // Update the path accordingly
import Sidebar from '../Sidebar.component';

const EditVendor = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const vendor = location.state && location.state.vendor;
  
    const [formData, setFormData] = useState({
      categoryName: '',
      vendorName: '',
      profileImage: '',
      email: '',
      password: '',
      address: '',
      postalCode: '',
      latitude: '',
      longitude: '',
      landmark: '',
      idProofPath: '',
      phoneNumber: '',
      openTime: '',
      closeTime: '',
      status: '',
    });
  
    useEffect(() => {
      if (vendor) {
        setFormData((prevData) => ({
          ...prevData,
          categoryName: vendor.categoryName || '',
          vendorName: vendor.vendorName || '',
          profileImage: vendor.profileImage || '',
          email: vendor.email || '',
          password: vendor.password || '',
          address: vendor.address || '',
          postalCode: vendor.postalCode || '',
          latitude: vendor.latitude || '',
          longitude: vendor.longitude || '',
          landmark: vendor.landmark || '',
          idProofPath: vendor.idProofPath || '',
          phoneNumber: vendor.phoneNumber || '',
          openTime: vendor.openTime || '',
          closeTime: vendor.closeTime || '',
          status: vendor.status || '',
        }));
      }
    }, [vendor]);
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const formDataWithId = {
        ...formData,
        id: vendor.id || '',
      };
      console.log(formDataWithId);
  
      try {
        const result = await authService.editVendor(formDataWithId);
        if (result) {
          toast.success('Update successful!');
          navigate('/vendor');
        }
      } catch (error) {
        console.log('Error during update:', error);
        toast.error('Vendor update failed');
      }
  
      setFormData({
        categoryName: '',
        vendorName: '',
        profileImage: '',
        email: '',
        password: '',
        address: '',
        postalCode: '',
        latitude: '',
        longitude: '',
        landmark: '',
        idProofPath: '',
        phoneNumber: '',
        openTime: '',
        closeTime: '',
        status: '',
      });
    };
  

  return (
    <form onSubmit={handleSubmit}>
      <div><Sidebar /></div>
      <div className='form-container'>
        <label>
          Category Name:
          <input type="text" name="categoryName" value={formData.categoryName} onChange={handleChange} />
        </label>

        <label>
          Vendor Name:
          <input type="text" name="vendorName" value={formData.vendorName} onChange={handleChange} />
        </label>

        <label>
          Profile Image:
          <input type="image" name="profileImage" value={formData.profileImage} onChange={handleChange} />
        </label>

        <label>
          Email:
          <input type="text" name="email" value={formData.email} onChange={handleChange} />
        </label>

        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>

        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
        </label>
        <label>
            Postal Code:
            <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} />

        </label>
        <label>
        Latitude:
            <input type="text" name="latitude" value={formData.latitude} onChange={handleChange} />

        </label>
        <label>
        Longitude:
            <input type="text" name="longitude" value={formData.longitude} onChange={handleChange} />

        </label>
        <label>
        Landmark:
            <input type="text" name="landmark" value={formData.landmark} onChange={handleChange} />
            </label>
            <label>
        Id Proof:
            <input type="text" name="idProofPath" value={formData.idProofPath} onChange={handleChange} />
            </label>
        <label>
        Contact Number:
            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />

        </label>
        <label>
        Open Time:
            <input type="time" name="openTime" value={formData.openTime} onChange={handleChange} />

        </label>
        <label>
        Close Time:
            <input type="time" name="closeTime" value={formData.closeTime} onChange={handleChange} />

        </label>

        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default EditVendor;
