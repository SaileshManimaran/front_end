import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import authService from '../services/auth.service';
import SideBar from './Sidebar.component';

import SearchBox from './seachBox.component';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { motion } from 'framer-motion';
import setBodyColor from '../funcs/setBodyColor';
import NavBarComponent from './nav-bar.component';
import DeleteOrder from '../funcs/deleteOrder';

const RedirectButton = () => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    // Redirect to the desired page
    navigate('/addorder');
  };

  return <button className='btn btn-primary btn-md mt-1' onClick={handleClick}>Add Orders</button>;
};

const OrderComponent = () => {
  const [orders, setOrders] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [value, setValue] = useState("");
  const [tempOrders, settempOrders] = useState([]);
  const [orderCount, setOrderCount] = useState(0);
  const [compType, setCompType] = useState('Order');

  const navigate = useNavigate(); // Use useNavigate here

  const handleRowClick = (selectedOrder) => {
    // Navigate to the "/viewOrder" route with the orderId
console.log(selectedOrder);
    navigate(`/viewOrder`, { state: { orderDetails: selectedOrder } });
  };

  const handleOrderDeleted = (deletedOrderId) => {
    // Update the orders state by removing the deleted user
    setOrders((prevOrder) => prevOrder.filter((order) => order.id !== deletedOrderId));
    setOrderCount((prevCount) => prevCount - 1); // Update user count
  };

  const fetchProfile = useCallback(async () => {
    try {
      const result = await authService.getOrder();
      console.log(result.data);
      setOrders(result.data);
      settempOrders(result.data);
    } catch (error) {
      toast.error(error.data.message);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleSearch = (results) => {
    setSearchResults(results);
    setSearchActive(true);

    console.log(compType);
  };

  const handleFilter = (selectedValue) => {
    console.log('Selected value:', selectedValue);
    setValue(selectedValue);

    if (orders.length < tempOrders.length) {
      setOrders(tempOrders);
    }

    let filteredorders;

    if (selectedValue === 'all') {
      // Show all orders
      filteredorders = tempOrders;
    } else {
      // Filter orders based on status
      filteredorders = tempOrders.filter(
        (user) =>
          user.status &&
          user.status.toString().toLowerCase() === selectedValue.toLowerCase()
      );
    }

    setOrders(filteredorders);
    setOrderCount(filteredorders.length); // Update user count
  };

  setBodyColor({ imageUrl: "https://img.freepik.com/free-photo/background_53876-32170.jpg?size=626&ext=jpg" });

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
                <h4 className='p-2 bd-highlight '>Manage Orders</h4>
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
                  <SearchBox onSearch={handleSearch} searchActive={searchActive} compType={compType}/>
                </div>
              </div>
              {searchActive ? (
                <div initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}>
                  {searchResults.length > 0 ? (
                    <div>
                        <div className='table-responsive'>
                      <h2 className="text-center">Search Results</h2>
                      <table className="table table-hover table-dark">
                        <thead>
                          <tr>
                          <th>ID</th>
                        <th>Name</th>
                        <th>Category Name </th>
                        <th>Vendors</th>
                        <th>Contact Number</th>
                        <th>Created at</th>
                        <th>Time Schedule</th>
                        <th>Delivered amount</th>
                        <th>Decision</th>                        
                    
                        <th>Customer id</th>
                        <th>Action</th>
                       
                          </tr>
                        </thead>
                        <tbody>
                        {searchResults.map((results) => (
                        <tr key={results.id} onClick={() => handleRowClick(results)} style={{ cursor: 'pointer' }}>
                          <th scope='row'>{results.id}</th>
                          <td>{results.user_name}</td>
                            <td>{results.category_name}</td>
                              <td>{results.vendor}</td>
                              <td>{results.contactNumber}</td>
                           
                              <td>{results.created_at }</td>
                                 <td>{results.time_schedule}</td>
                              <td>{results.deliveredAmount}</td>
                              <td>{results.decision}</td>
                          <td>{results.customer_id}</td>
                            <td><DeleteOrder order={results} onOrderDeleted={handleOrderDeleted}/></td></tr>
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
                        <th>Category Name </th>
                        <th>Vendors</th>
                        <th>Contact Number</th>
                        <th>Created at</th>
                        <th>Time Schedule</th>
                        <th>Delivered amount</th>
                        <th>Decision</th>                        
                    
                        <th>Customer id</th>
                        <th>Action</th>
                       
                      </tr>
                    </thead>
                    <tbody>
                        {orders.map((results) => (
                        <tr key={results.id} onClick={() => handleRowClick(results)} style={{ cursor: 'pointer' }}>
                          <th scope='row'>{results.id}</th>
                          <td>{results.user_name}</td>
                            <td>{results.category_name}</td>
                              <td>{results.vendor}</td>
                              <td>{results.contactNumber}</td>
                           
                              <td>{results.created_at }</td>
                                 <td>{results.time_schedule}</td>
                              <td>{results.deliveredAmount}</td>
                              <td>{results.decision}</td>
                          <td>{results.customer_id}</td>
                            <td><DeleteOrder order={results} onOrderDeleted={handleOrderDeleted}/></td>                            </tr>
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

export default OrderComponent;
