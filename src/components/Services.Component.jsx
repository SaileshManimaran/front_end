import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import authService from '../services/auth.service';
import SideBar from './Sidebar.component';
import SearchBox from './seachBox.component';
import { useNavigate } from 'react-router-dom';
import NavBarComponent from './nav-bar.component';
import { motion } from 'framer-motion';
import DeleteService from '../funcs/deleteService';
import setBodyColor from '../funcs/setBodyColor';

const RedirectButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/addService');
  };

  return (
    <button className='btn btn-md mt-1 addUser' onClick={handleClick}>
      Add Service
    </button>
  );
};

const RedirectToEditService = ({ service }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/editService/${service.id}`, { state: { service } });
  };

  return <button onClick={handleClick} className='editButton'>Edit Service</button>;
};

const ServiceComponent = ({ serviceType }) => {
  const [services, setServices] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [value, setValue] = useState('');
  const [tempServices, setTempServices] = useState([]);
  const [serviceCount, setServiceCount] = useState(0);
  const [compType, setCompType] = useState('Services');
  const [categoryName,setCategoryName] = useState([]);

  const fetchServices = useCallback(async () => {
    try {
      const result = await authService.getService();
      const categories = result.data.map((service) => service.category_name); // Extract category names
      setCategoryName(categories);
      setServices(result.data);
      setTempServices(result.data);
      setServiceCount(result.data.length);
    } catch (error) {
      toast.error(error);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleSearch = (results) => {
    setSearchResults(results);
    setSearchActive(true);
  };

  const handleFilter = (selectedValue) => {
    setValue(selectedValue);

    if (services.length < tempServices.length) {
      setServices(tempServices);
    }

    let filteredServices;

    if (selectedValue === 'all') {
      filteredServices = tempServices;
    } else {
      filteredServices = tempServices.filter(
        (service) =>
          service.category_name &&
          service.category_name.toLowerCase() === selectedValue.toLowerCase()
      );
    }

    setServices(filteredServices);
    setServiceCount(filteredServices.length);
  };

  const handleServiceDeleted = (deletedServiceId) => {
    setServices((prevServices) =>
      prevServices.filter((service) => service.service_id !== deletedServiceId)
    );
    setServiceCount((prevCount) => prevCount - 1);
  };

  setBodyColor({
    imageUrl:
      'https://img.freepik.com/free-photo/background_53876-32170.jpg?size=626&ext=jpg',
  });

  return (
    <div className={`${serviceType}-comp`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ minHeight: '100vh' }}
      >
        <NavBarComponent />
        <SideBar />

        <div className={`row_${serviceType}`}>
          <div className='col-xs-12'>
            <div className='card mrg_bottom '>
              <div className='col-md-5 col-xs-12'>
                <h4 className='p-2 bd-highlight'>Manage Service</h4>
              </div>

              <div className='d-flex bd-highlight mb-1'>
                <div className='p-2 bd-highlight mt-'>
                  <select
                    className='dropdown-button'
                    value={value}
                    onChange={(e) => handleFilter(e.target.value)}
                  >
                    <option value='all'>All services</option>
                    {/* Dynamically populate categories based on available categories */}
                    {categoryName.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='p-2 bd-highlight'>
                  <RedirectButton />
                </div>
                <div className='ms-auto p-2 bd-highlight'>
                  <SearchBox
                    onSearch={handleSearch}
                    searchActive={searchActive}
                    compType={compType}
                  />
                </div>
              </div>

              {searchActive ? (
                <div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {searchResults.length > 0 ? (
                    <div className='table-responsive'>
                      <h2 className='text-center'>Search Results</h2>
                      <table className='table table-hover table-light'>
                        <thead>
                          <tr>
                            <th scope='col'>ID</th>
                            <th scope='col'>Category Name</th>
                            <th scope='col'>Subcategory Name</th>
                            <th scope='col'>Service Name</th>
                            <th scope='col'>Price type</th>
                            <th scope='col'>Service type</th>
                            <th scope='col'>Discount Price</th>
                            <th scope='col'>Status</th>
                            <th scope='col'>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {searchResults.map((service) => (
                            <tr key={service.service_id}>
                              <th scope='row'>{service.service_id}</th>
                              <td>{service.category_name}</td>
                              <td>{service.subcategory_name}</td>
                              <td>{service.service_name}</td>
                              <td>{service.price_type}</td>
                              <td>{service.service_price}</td>
                              <td>{service.discount_price}</td>
                              <td>{service.status}</td>
                              <td>
                                <RedirectToEditService service={service} />{' '}
                                <DeleteService
                                  service={service.service_id}
                                  onServiceDeleted={handleServiceDeleted}
                                />
                              </td>
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
                  <h4 className='text-center'>Total Services: {serviceCount}</h4>
                  <div className='table-responsive'>
                    <table className='table table-hover table-light'>
                      <thead>
                        <tr>
                          <th scope='col'>ID</th>
                          <th scope='col'>Category Name</th>
                          <th scope='col'>Subcategory Name</th>
                          <th scope='col'>Service Name</th>
                          <th scope='col'>Price type</th>
                          <th scope='col'>Service type</th>
                          <th scope='col'>Discount Price</th>
                          <th scope='col'>Status</th>
                          <th scope='col'>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {services.map((service) => (
                          <tr key={service.service_id}>
                            <th scope='row'>{service.service_id}</th>
                            <td>{service.category_name}</td>
                            <td>{service.subcategory_name}</td>
                            <td>{service.service_name}</td>
                            <td>{service.price_type}</td>
                            <td>{service.service_price}</td>
                            <td>{service.discount_price}</td>
                            <td>{service.status}</td>
                            <td>
                              <RedirectToEditService service={service} />{' '}
                              <DeleteService
                                service={service.service_id}
                                onServiceDeleted={handleServiceDeleted}
                              />
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

export default ServiceComponent;
