import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import authService from '../../services/auth.service.js';
import SideBar from '../Sidebar.component';
import '../../styles/tables.css';
// import '../styles/vendorComp.css';
import SearchBox from '../seachBox.component';
import { useNavigate } from 'react-router-dom';
// import EditVendorComponent from '../editVendor.component';
import NavBarComponent from '../nav-bar.component';
import { motion } from 'framer-motion';
import DeleteVendor from '../Vendors.Component/deleteVendor.js';
import setBodyColor from '../../funcs/setBodyColor';

const RedirectButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/addvendor');
  };

  return (
    <button className='btn btn-primary btn-md mt-1' onClick={handleClick}>
      Add Vendor
    </button>
  );
};

const RedirectToEditVendor = ({ vendor }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/editVendor', { state: { vendor } });
  };

  return <button onClick={handleClick} className='editButton'>Edit Vendor</button>;
};

const VendorsComponent = () => {
  const [vendors, setVendors] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [value, setValue] = useState('');
  const [tempVendors, setTempVendors] = useState([]);
  const [vendorCount, setVendorCount] = useState(0);
  const [compType,setCompType]=useState('Vendors');

  const fetchVendors = useCallback(async () => {
    try {
      const result = await authService.getVendor();
      console.log(result.data);
      setVendors(result.data);
      setTempVendors(result.data);
      setVendorCount(result.data.length);
    } catch (error) {
      toast.error(error);
    }
  }, []);

  useEffect(() => {
    fetchVendors();
  }, [fetchVendors]);

  const handleSearch = (results) => {
    setSearchResults(results);
    setSearchActive(true);
  };

  const handleFilter = (selectedValue) => {
    setValue(selectedValue);

    if (vendors.length < tempVendors.length) {
      setVendors(tempVendors);
    }

    let filteredVendors;

    if (selectedValue === 'all') {
      filteredVendors = tempVendors;
    } else {
      filteredVendors = tempVendors.filter(
        (vendor) =>
          vendor.status &&
          vendor.status.toString().toLowerCase() === selectedValue.toLowerCase()
      );
    }

    setVendors(filteredVendors);
    setVendorCount(filteredVendors.length);
  };

  const handleVendorDeleted = (deletedVendorId) => {
    setVendors((prevVendors) => prevVendors.filter((vendor) => vendor.id !== deletedVendorId));
    setVendorCount((prevCount) => prevCount - 1);
  };

  setBodyColor({ imageUrl: 'https://img.freepik.com/free-photo/background_53876-32170.jpg?size=626&ext=jpg' });

  return (
    <div className='vendor-comp'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ minHeight: '100vh' }}
      >
        <NavBarComponent />
        <SideBar />

        <div className='row_vendor'>
          <div className='col-xs-12'>
            <div className='card mrg_bottom '>
              <div className='col-md-5 col-xs-12'>
                <h4 className='p-2 bd-highlight '>Manage Vendors</h4>
              </div>

              <div className='d-flex bd-highlight mb-1'>
                <div className='p-2 bd-highlight mt-'>
                  <select
                    className='dropdown-button'
                    value={value}
                    onChange={(e) => handleFilter(e.target.value)}
                  >
                    <option value='all'>All Vendors</option>
                    <option value='true'>Enable</option>
                    <option value='false'>Disable</option>
                  </select>
                </div>
                <div className='p-2 bd-highlight'>
                  <RedirectButton />
                </div>
                <div className='ms-auto p-2 bd-highlight'>
                  <SearchBox onSearch={handleSearch} searchActive={searchActive} compType={compType}/>
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
                      <table className='table table-hover table-light'>
                        <thead>
                        <tr>
                        <th scope='col'>ID</th>
                        <th scope='col'>Category Name</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Email</th>
                     
                        <th scope='col'>Password</th>
                        <th scope='col'>Status</th>
                        <th scope='col'>Action</th>
                      </tr>
                        </thead>
                        <tbody>
                          {searchResults.map((vendor) => (
                            <tr key={vendor.id}>
                              <th scope='row'>{vendor.id}</th>
                              <td>{vendor.categoryName}</td>
                          <td>{vendor.vendorName}</td>
                          <td>{vendor.email}</td>
                          <td>{vendor.password}</td>
                          
                          <td>{vendor.status}</td>
                          <td>
                            <RedirectToEditVendor vendor={vendor} />{' '}
                            <DeleteVendor vendor={vendor} onVendorDeleted={handleVendorDeleted} />
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
                  <h4 className='text-center'>Total Vendors: {vendorCount}</h4>
                  <div className="table-responsive">
                  <table className='table table-hover table-light'>
                    <thead>
                      <tr>
                        <th scope='col'>ID</th>
                        <th scope='col'>Category Name</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Email</th>
                     
                        <th scope='col'>Password</th>
                        <th scope='col'>Status</th>
                        <th scope='col'>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vendors.map((vendor) => (
                        <tr key={vendor.id}>
                          <th scope='row'>{vendor.id}</th>
                          <td>{vendor.categoryName}</td>
                          <td>{vendor.vendorName}</td>
                          <td>{vendor.email}</td>
                          <td>{vendor.password}</td>
                          
                          <td>{vendor.status}</td>
                          <td>
                            <RedirectToEditVendor vendor={vendor} />{' '}
                            <DeleteVendor vendor={vendor} onVendorDeleted={handleVendorDeleted} />
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

export default VendorsComponent;
