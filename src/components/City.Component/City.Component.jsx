import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import authService from '../../services/auth.service'; // Assuming you fetch city data from a service
import SideBar from '../Sidebar.component';
import '../../styles/tables.css';
import '../../styles/userComp.css'; // Assuming styles are reusable
import SearchBox from '../seachBox.component';
import { useNavigate } from 'react-router-dom';
import NavBarComponent from '../nav-bar.component';
import { motion } from 'framer-motion';
import DeleteCity from '../City.Component/DeleteCity';
import setBodyColor from '../../funcs/setBodyColor'; // Assuming this function is reusable

const RedirectButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Redirect to the desired page
    navigate('/addCity');
  };

  return (
    <button className='btn btn-primary btn-md mt-1 addCity' onClick={handleClick}>
      Add City
    </button>
  );
};

const RedirectToEditCity = ({ city }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Redirect to the desired page with the city prop
    navigate('/editCity', { state: { city } });
  };

  return <button onClick={handleClick} className='editButton'>Edit City</button>;
};

const CityComponent = () => {
  const [cities, setCities] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [value, setValue] = useState('');
  const [tempCities, setTempCities] = useState([]);
  const [cityCount, setCityCount] = useState(0);
  const [compType,setCompType]=useState('City');


  const fetchCities = useCallback(async () => {
    try {
      // Fetch cities from the service
      const result = await authService.getCity(); // Assuming a similar service exists
      console.log(result.data);
      setCities(result.data);
      setTempCities(result.data);
      setCityCount(result.data.length);
    } catch (error) {
      toast.error(error);
    }
  }, []);

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  const handleSearch = (results) => {
    setSearchResults(results);
    setSearchActive(true);
  };

  const handleFilter = (selectedValue) => {
    console.log('Selected value:', selectedValue);
    setValue(selectedValue);

    if (cities.length < tempCities.length) {
      setCities(tempCities);
    }

    let filteredCities;

    if (selectedValue === 'all') {
      filteredCities = tempCities;
    } else {
      filteredCities = tempCities.filter(
        (city) =>
          city.status &&
          city.status.toString().toLowerCase() === selectedValue.toLowerCase()
      );
    }

    setCities(filteredCities);
    setCityCount(filteredCities.length);
  };

  const handleCityDeleted = (deletedCityId) => {
    // Update the cities state by filtering out the deleted city
    setCities((prevCities) => prevCities.filter((city) => city.id !== deletedCityId));
    // Update the city count by decrementing it
    setCityCount((prevCount) => prevCount - 1);
  };

  setBodyColor({ imageUrl: 'https://img.freepik.com/free-photo/background_53876-32170.jpg?size=626&ext=jpg' });

  return (
    <div className='city-comp'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ minHeight: '100vh' }}
      >
        <NavBarComponent />
        <SideBar />

        <div className='row_city'>
          <div className='col-xs-12'>
            <div className='card mrg_bottom '>
              <div className='col-md-5 col-xs-12'>
                <h4 className='p-2 bd-highlight '>Manage Cities</h4>
              </div>

              <div className='d-flex bd-highlight mb-1'>
                <div className='p-2 bd-highlight mt-'>
                  <select
                    className='dropdown-button'
                    value={value}
                    onChange={(e) => handleFilter(e.target.value)}
                  >
                    <option value='all'>All Cities</option>
                    <option value='enabled'>Enabled</option>
                    <option value='disabled'>Disabled</option>
                  </select>
                </div>
                <div className='p-2 bd-highlight'>
                  <RedirectButton />
                </div>
                <div className='ms-auto p-2 bd-highlight'>
                  <SearchBox onSearch={handleSearch} searchActive={searchActive} compType={compType}  />
                </div>
              </div>

              {searchActive ? (
                <div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {searchResults.length > 0 ? (
                    <div className="table-responsive">
                      <h2 className='text-center'>Search Results</h2>
                      <table className='table table-hover table-dark'>
                        <thead>
                          <tr>
                            <th scope='col'>ID</th>
                           <th scope='col'>City</th>
                           <th scope='col'>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {searchResults.map((city) => (
                            <tr key={city.id}>
                              <th scope='row'>{city.id}</th>
                              <td>{city.cityName}</td>
                             <td>{city.status}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p>No results found.</p>
                  )}
                </div>
              ) : (
                <div className='col-md-12 mrg-top'>
                  <h4 className='text-center'>Total Cities: {cityCount}</h4>
                  <div className="table-responsive">
                  <table className='table table-hover table-light'>
                    <thead>
                      <tr>
                        <th scope='col'>ID</th>
                        <th scope='col'>City</th>
             
                        <th scope='col'>Status</th>
                        <th scope='col'>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cities.map((city) => (
                        <tr key={city.id}>
                          <th scope='row'>{city.id}</th>
                          <td>{city.cityName}</td>
                         
                          <td>{city.status}</td>
                          <td>
                            <RedirectToEditCity city={city} />{' '}
                            <DeleteCity city={city} onCityDeleted={handleCityDeleted} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CityComponent;
