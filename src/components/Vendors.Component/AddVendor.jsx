import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/addUser.css';
import '../../styles/forms.css';
import toast from 'react-hot-toast';
import authService from '../../services/auth.service'; // Update the path accordingly
import Sidebar from '../Sidebar.component';

const AddVendor = () => {
  const navigate = useNavigate();
    const [categories,setCategories]=useState([]);
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
    const fetchCategories = async () => {
      try {
          const result = await authService.getCategory();
          setCategories(result.data);
          console.log(categories);
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
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await authService.addVendor(formData);
      if (result.data) {
        toast.success('Vendor added successfully!');
        navigate('/vendor');
      }
    } catch (error) {
      console.log('Error during vendor addition:', error);
      toast.error('Vendor addition failed');
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

  const handleGoBack = () => {
    navigate("/vendor"); // Go back one step in history
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Sidebar />
      </div>

        <h3 className='p-2 bd-highlight' style={{textAlign:"center"}}>Add new vendor</h3>
        <div className='form-container'>
        <label>
            Category Name:
            <select
              name="categoryName"
              value={formData.categoryName}
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
          Vendor Name:
          <input
            type='text'
            name='vendorName'
            value={formData.vendorName}
            onChange={handleChange}
          />
        </label>

        <label>
          Profile Image:
          <input
            type='file'
            name='profileImage'
            value={formData.profileImage}
            onChange={handleChange}
          />
        </label>

        <label>
          Email:
          <input type='text' name='email' value={formData.email} onChange={handleChange} />
        </label>

        <label>
          Password:
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
          />
        </label>

        <label>
          Address:
          <input type='text' name='address' value={formData.address} onChange={handleChange} />
        </label>

        <label>
          Postal Code:
          <input
            type='text'
            name='postalCode'
            value={formData.postalCode}
            onChange={handleChange}
          />
        </label>

        <label>
          Latitude:
          <input type='text' name='latitude' value={formData.latitude} onChange={handleChange} />
        </label>

        <label>
          Longitude:
          <input type='text' name='longitude' value={formData.longitude} onChange={handleChange} />
        </label>

        <label>
          Landmark:
          <input type='text' name='landmark' value={formData.landmark} onChange={handleChange} />
        </label>

        <label>
          Id Proof:
          <input
            type='text'
            name='idProofPath'
            value={formData.idProofPath}
            onChange={handleChange}
          />
        </label>

        <label>
          Contact Number:
          <input
            type='text'
            name='phoneNumber'
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </label>

        <label>
          Open Time:
          <input type='time' name='openTime' value={formData.openTime} onChange={handleChange} />
        </label>

        <label>
          Close Time:
          <input type='time' name='closeTime' value={formData.closeTime} onChange={handleChange} />
        </label>

      </div>
      <div>
      <button type=" btn btn-success button" onClick={handleGoBack}>Back</button>
        <button type="submit" style={{ marginLeft:"210px"}} >Submit</button>
      </div>
    </form>
  );
};

export default AddVendor;
