import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import authService from '../../services/auth.service';
import SideBar from '../Sidebar.component';
import DeleteAddress from './DeleteAddress';
import SearchBox from '../seachBox.component';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import setBodyColor from '../../funcs/setBodyColor';
import NavBarComponent from '../nav-bar.component';

const RedirectButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Redirect to the desired page
    navigate('/addAddress');
  };

  return <button className='btn btn-primary btn-md mt-1' onClick={handleClick}>Add Address</button>;
};




const RedirectToEditAddress = ({address}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log(address);
    // Redirect to the desired page with the users prop
    navigate('/editAddress', { state: { address } });
  };

  return <button onClick={handleClick} className='editButton'>Edit</button>;
};
const AddressComponent = () => {
  const [users, setUsers] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [value, setValue] = useState("");
  const [tempUsers, setTempUsers] = useState([]);
const [address,setAddresses]=useState([]);
const [addressCount,setAddressCount]=useState([]);
  const [compType, setCompType] = useState('Address');
  const fetchProfile = useCallback(async () => {
    try {
      const result = await authService.getAddress();
      console.log(result.data);
      setUsers(result.data);
      setTempUsers(result.data);
    } catch (error) {
      toast.error(error.data);
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
    console.log("Selected value:", selectedValue);
    setValue(selectedValue);

    if (users.length < tempUsers.length) {
      setUsers(tempUsers);
    }

    let filteredUsers;

    if (selectedValue === 'all') {
      // Show all users
      filteredUsers = tempUsers;
    } else {
      // Filter users based on status
      filteredUsers = tempUsers.filter(user => user.status && user.status.toString().toLowerCase() === selectedValue.toLowerCase());
    }

    setUsers(filteredUsers);
  };

  setBodyColor({ imageUrl: "https://img.freepik.com/free-photo/background_53876-32170.jpg?size=626&ext=jpg" });
  const handleAddressDeleted = (deletedAddressId) => {
    // Assuming cities and cityCount are your state variables
    setUsers((prevAddresses) => prevAddresses.filter((address) => address.id !== deletedAddressId));
    setAddressCount((prevCount) => prevCount - 1);
  };
  return (
    <motion.div initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>

      <div>
        <NavBarComponent />
        <SideBar />

        <div className="row_user" >
          <div className="col-xs-12">
            <div className="card mrg_bottom ">

              <div className="col-md-5 col-xs-12">
                <h4 className='p-2 bd-highlight '>Manage Address</h4>
              </div>

              <div className="d-flex bd-highlight mb-3">
                <div className="p-2 bd-highlight mt-">
                  <select className="dropdown-button" value={value} onChange={(e) => handleFilter(e.target.value)}>
                    <option value="true">Enable</option>
                    <option value="false">Disable</option>
                    <option value="all">All User</option>
                  </select>
                </div>
                <div className='p-2 bd-highlight'><RedirectButton /></div>
                <div className='ms-auto p-2 bd-highlight'>
                  <SearchBox onSearch={handleSearch} searchActive={searchActive}  compType={compType}/>
                </div>
              </div>
              {searchActive ? (
                <div initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}>
                  {searchResults.length > 0 ? (
                    <div>
                      <h2 className="text-center">Search Results</h2>
                      <div className='table-responsive'>
                      <table className="table table-hover table-dark">
                        <thead>
                          <tr>
                          <th>ID</th>
                        <th>Name</th>
                        <th>Contact Number</th>
                        <th>House NO</th>
                        <th>Address</th>
                        <th>Landmark</th>
                        <th>City</th>
                        <th>Pincode</th>                        
                        <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {searchResults.map((result) => (
                            <tr key={result.id}>
                              <td>{result.id}</td>
                              <td>{result.name}</td>

                              <td>{result.number}</td>
                              <td>{result.houseNo}</td>
                              <td>{result.address}</td>
                              <td>{result.landmark}</td>
                              <td>{result.city}</td>
                              <td>{result.pincode}</td>
                          <td>{result.status}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    </div>
                  ) : (
                    <p>No results found.</p>
                  )}
                </div>
              ) : (
                <div className="col-md-12 mrg-top">
                  <div className='table-responsive'>
                  <table className="table table-hover table-light">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Contact Number</th>
                        <th>House NO</th>
                        <th>Address</th>
                        <th>Landmark</th>
                        <th>City</th>
                        <th>Pincode</th>                        
                        <th>Status</th>
                        <th>Action</th>
                       
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((result) => (
                        <tr key={result.id}>
                          <th scope='row'>{result.id}</th>
                          <td>{result.name}</td>
                     
                              <td>{result.number}</td>
                              <td>{result.houseNo}</td>
                              <td>{result.address}</td>
                              <td>{result.landmark}</td>
                              <td>{result.city}</td>
                              <td>{result.pincode}</td>
                          <td>{result.status}</td>
                          <td><RedirectToEditAddress address={result} />
                  <DeleteAddress address={result} onAddressDeleted={handleAddressDeleted}/></td>
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
      </div>

    </motion.div>
  );
};

export default AddressComponent;
