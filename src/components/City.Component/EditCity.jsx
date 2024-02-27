import React, { useState ,useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/forms.css';
import toast from 'react-hot-toast';
import authService from '../../services/auth.service'; // Update the path accordingly
import Sidebar from '../Sidebar.component';

const EditCity = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const city = location.state && location.state.city;
  
    const [formData, setFormData] = useState({
      cityName: '',
      population: '',
      country: '',
      status: '',
    });
  
    useEffect(() => {
      if (city) {
        setFormData((prevData) => ({
          ...prevData,
          cityName: city.cityName || '',
          population: city.population || '',
          country: city.country || '',
          status: city.status || '',
        }));
      }
    }, [city]);
  
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
        id: city.id || '',
      };
      console.log(formDataWithId);
  
      try {
        const result = await authService.editCity(formDataWithId);
        if (result) {
          toast.success('City update successful!');
          navigate('/city');
        }
      } catch (error) {
        console.log('Error during city update:', error);
        toast.error('City update failed');
      }
  
      setFormData({
        cityName: '',
        population: '',
        country: '',
        status: '',
      });
    };
    const handleGoBack = () => {
      navigate("/city"); // Go back one step in history
    };

  return (
    <form onSubmit={handleSubmit}>
      <div><Sidebar /></div>
      <div className='form-container'>
        
        
   
        <label>
          City Name:
          <input type="text" name="cityName" value={formData.cityName} onChange={handleChange} />
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

export default EditCity;
