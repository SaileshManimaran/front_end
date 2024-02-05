// subcatComponent.jsx
import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import authService from '../services/auth.service';
import SideBar from './Sidebar.component';
import '../styles/tables.css';
import '../styles/userComp.css';
import SearchBox from './seachBox.component';
import { useNavigate } from 'react-router-dom';
import NavBarComponent from './nav-bar.component';
import { motion } from 'framer-motion';
import DeleteUser from '../funcs/deleteUser';
import setBodyColor from '../funcs/setBodyColor';
import DeleteSubcat from '../funcs/deleteSubcat';

const RedirectButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Redirect to the desired page
    navigate('/addsubcat');
  };

  return (
    <button className='btn btn-md mt-1 addUser' onClick={handleClick}>
      Add Subcategory
    </button>
  );
};

const RedirectToEditSubCat = ({ subcat }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log(subcat);
    // Redirect to the desired page with the subcat prop
    navigate('/editSubcat', { state: { subcat } });
  };

  return <button onClick={handleClick} className='editButton'>Edit</button>;
};

const SubcatComponent = ({  }) => {
  const [subcat, setSubcat] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [value, setValue] = useState('');
  const [tempSubcat, setTempSubcat] = useState([]);
  const [compType,setCompType]=useState('Subcat')
  const [subcatCount, setSubcatCount] = useState(0); // New state for subcat count

  const fetchProfile = useCallback(async () => {
    try {
      const result = await authService.getSubCat();
      console.log(result.data);
      setSubcat(result.data);
      setTempSubcat(result.data);
      setSubcatCount(result.data.length); // Update subcat count
     // Pass subcat count to parent component
    } catch (error) {
    toast.error(error);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleSearch = (results) => {
    setSearchResults(results);
    setSearchActive(true);
  };

  const handleFilter = (selectedValue) => {
    console.log('Selected value:', selectedValue);
    setValue(selectedValue);

    if (subcat.length < tempSubcat.length) {
      setSubcat(tempSubcat);
    }

    let filteredsubcat;

    if (selectedValue === 'all') {
      // Show all subcat
      filteredsubcat = tempSubcat;
    } else {
      // Filter subcat based on status
      filteredsubcat = tempSubcat.filter(
        (subcat) =>
          subcat.status &&
          subcat.status.toString().toLowerCase() === selectedValue.toLowerCase()
      );
    }

    setSubcat(filteredsubcat);
    setSubcatCount(filteredsubcat.length); // Update subcat count
  };

  const handlesubcatDeleted = (deletedsubcatId) => {
    // Update the subcat state by removing the deleted subcat
    setSubcat((prevsubcat) => prevsubcat.filter((subcat) => subcat.id !== deletedsubcatId));
    setSubcatCount((prevCount) => prevCount - 1); // Update subcat count
   // Pass subcat count to parent component
  };

  setBodyColor({ imageUrl: 'https://img.freepik.com/free-photo/background_53876-32170.jpg?size=626&ext=jpg' });

  return (
    
    <div className='subcat-comp'>
    
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ minHeight: '100vh' }}
      >
        
        <NavBarComponent />
        <SideBar />

        <div className='row_subcat'>
          <div className='col-xs-12'>
            <div className='card mrg_bottom '>
              <div className='col-md-5 col-xs-12'>
                <h4 className='p-2 bd-highlight '>Manage subcategory</h4>
              </div>

              <div className='d-flex bd-highlight mb-1'>
                <div className='p-2 bd-highlight mt-'>
                  <select
                    className='dropdown-button'
                    value={value}
                    onChange={(e) => handleFilter(e.target.value)}
                  >
                    <option value='all'>All subcat</option>
                    <option value='true'>Enable</option>
                    <option value='false'>Disable</option>
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
                      <table className='table table-hover table-light'>
                        <thead>
                          <tr>
                            <th scope='col'>ID</th>
                            <th scope='col'>Category Name</th>
                            <th scope='col'>Subcategory Name</th>
                            <th scope='col'>Status</th>
                            <th scope='col'>Category ID</th>
                            <th scope='col'>Action</th> 
                         
                          </tr>
                        </thead>
                        <tbody>
                          {searchResults.map((results) => (
                            <tr key={results.id}>
                              <th scope='row'>{results.id}</th>
                              <td>{results.category_name}</td>
                              <td>{results.subcategory_name}</td>
                              <td>{results.status}</td>
                              <td>{results.CATEGORYID}</td>
                              <td>
                            <RedirectToEditSubCat subcat={results}  />{' '}
                            <DeleteSubcat subcat={results.id} onsubcatDeleted={handlesubcatDeleted} />
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
                  <h4 className='text-center'>Total subcat: {subcatCount}</h4>
                  <div className="table-responsive">
                  <table className='table table-hover table-light'>
                    <thead>
                      <tr>
                      <th scope='col'>ID</th>
                            <th scope='col'>Category Name</th>
                            <th scope='col'>Subcategory Name</th>
                            <th scope='col'>Status</th>
                            <th scope='col'>Category ID</th>
                            <th scope='col'>Action</th> 

                      </tr>
                    </thead>
                    <tbody>
                      {subcat.map((results) => (
                        <tr key={results.id}>
                          
                            <th scope='row'>{results.id}</th>
                              <td>{results.category_name}</td>
                              <td>{results.subcategory_name}</td>
                              <td>{results.status}</td>
                              <td>{results.CATEGORYID}</td>
                          <td>
                            <RedirectToEditSubCat subcat={results}  />{' '}
                            <DeleteSubcat subcat={results.id} onsubcatDeleted={handlesubcatDeleted} />
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

export default SubcatComponent;
