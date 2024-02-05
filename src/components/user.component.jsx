// UserComponent.jsx
import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import authService from '../services/auth.service';
import SideBar from './Sidebar.component';
import '../styles/tables.css';
import '../styles/userComp.css';
import SearchBox from './seachBox.component';
import { useNavigate } from 'react-router-dom';
import EditUserComponent from './editUser.component';
import NavBarComponent from './nav-bar.component';
import { motion } from 'framer-motion';
import DeleteUser from '../funcs/deleteUser';
import setBodyColor from '../funcs/setBodyColor';

const RedirectButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Redirect to the desired page
    navigate('/adduser');
  };

  return (
    <button className='btn btn-md mt-1 addUser' onClick={handleClick}>
      Add User
    </button>
  );
};

const RedirectToEditUser = ({ user }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Redirect to the desired page with the users prop
    navigate('/editUser', { state: { user } });
  };

  return <button onClick={handleClick} className='editButton'>Edit User</button>;
};

const UserComponent = ({  }) => {
  const [users, setUsers] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [value, setValue] = useState('');
  const [tempUsers, setTempUsers] = useState([]);
  const [userCount, setUserCount] = useState(0); // New state for user count

  const fetchProfile = useCallback(async () => {
    try {
      const result = await authService.getUser();
      console.log(result.data);
      setUsers(result.data);
      setTempUsers(result.data);
      setUserCount(result.data.length); // Update user count
     // Pass user count to parent component
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

    if (users.length < tempUsers.length) {
      setUsers(tempUsers);
    }

    let filteredUsers;

    if (selectedValue === 'all') {
      // Show all users
      filteredUsers = tempUsers;
    } else {
      // Filter users based on status
      filteredUsers = tempUsers.filter(
        (user) =>
          user.status &&
          user.status.toString().toLowerCase() === selectedValue.toLowerCase()
      );
    }

    setUsers(filteredUsers);
    setUserCount(filteredUsers.length); // Update user count
  };

  const handleUserDeleted = (deletedUserId) => {
    // Update the users state by removing the deleted user
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== deletedUserId));
    setUserCount((prevCount) => prevCount - 1); // Update user count
   // Pass user count to parent component
  };

  setBodyColor({ imageUrl: 'https://img.freepik.com/free-photo/background_53876-32170.jpg?size=626&ext=jpg' });

  return (
    
    <div className='user-comp'>
    
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ minHeight: '100vh' }}
      >
        
        <NavBarComponent />
        <SideBar />

        <div className='row_user'>
          <div className='col-xs-12'>
            <div className='card mrg_bottom '>
              <div className='col-md-5 col-xs-12'>
                <h4 className='p-2 bd-highlight '>Manage Users</h4>
              </div>

              <div className='d-flex bd-highlight mb-1'>
                <div className='p-2 bd-highlight mt-'>
                  <select
                    className='dropdown-button'
                    value={value}
                    onChange={(e) => handleFilter(e.target.value)}
                  >
                    <option value='all'>All User</option>
                    <option value='true'>Enable</option>
                    <option value='false'>Disable</option>
                  </select>
                </div>
                <div className='p-2 bd-highlight'>
                  <RedirectButton />
                </div>
                <div className='ms-auto p-2 bd-highlight'>
                  <SearchBox onSearch={handleSearch} searchActive={searchActive}   />
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
                            <th scope='col'>Name</th>
                            <th scope='col'>Email</th>
                            <th scope='col'>Contact Number</th>
                            <th scope='col'>Password</th>
                            <th scope='col'>Status</th>
                            <th scope='col'>Role</th>
                          </tr>
                        </thead>
                        <tbody>
                          {searchResults.map((results) => (
                            <tr key={results.id}>
                              <th scope='row'>{results.id}</th>
                              <td>{results.name}</td>
                              <td>{results.email}</td>
                              <td>{results.contactNumber}</td>
                              <td>{results.password}</td>
                              <td>{results.status}</td>
                              <td>{results.role}</td>
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
                  <h4 className='text-center'>Total Users: {userCount}</h4>
                  <div className="table-responsive">
                  <table className='table table-hover table-light'>
                    <thead>
                      <tr>
                        <th scope='col'>ID</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Email</th>
                        <th scope='col'>Contact Number</th>
                        <th scope='col'>Password</th>
                        <th scope='col'>Status</th>
                        <th scope='col'>Role</th>
                        <th scope='col'>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id}>
                          <th scope='row'>{user.id}</th>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.contactNumber}</td>
                          <td>{user.password}</td>
                          <td>{user.status}</td>
                          <td>{user.role}</td>
                          <td>
                            <RedirectToEditUser user={user} />{' '}
                            <DeleteUser user={user} onUserDeleted={handleUserDeleted} />
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

export default UserComponent;
