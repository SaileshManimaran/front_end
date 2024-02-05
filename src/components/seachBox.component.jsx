// SearchBar.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/searchBox.css'; // Import the CSS file

const SearchBar = ({ onSearch, searchActive ,compType}) => {
  // State variables
  const [contactNumber, setContactNumber] = useState('');
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch user details from the server
  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      setError(null);
  
      const apiUrl = getApiUrl();
      const response = await axios.get(apiUrl);
      setUserDetails(response.data);
  
      // Call the parent component's handleSearch with the search results
      onSearch(response.data);
    } catch (error) {
      // Error handling remains the same
    } finally {
      setLoading(false);
    }
  };
  
  const getApiUrl = () => {
    if (compType === "Order") {
      return `http://localhost:8080/user/order/getOne/${contactNumber}`;
    } else if (compType === "category") {
      
      return `http://localhost:8080/user/category/getOne/${contactNumber}`;
    }
    
    else if (compType === "Address") {
      return `http://localhost:8080/user/address/getOne/${contactNumber}`;
    }

    else if (compType === "Subcat") {
      return `http://localhost:8080/user/subcat/getOne/${contactNumber}`;
    }
    else if (compType === "Services") {
      return `http://localhost:8080/user/service/getOne/${contactNumber}`;
    }
    else if (compType === "Vendors") {
      return `http://localhost:8080/user/vendors/getOne/${contactNumber}`;
    }

    else {
      return `http://localhost:8080/user/getOne/${contactNumber}`;
    }
  };

  // Log the first user detail when userDetails change
  useEffect(() => {
    if (userDetails.length > 0) {
      console.log(userDetails[0]);
   
    }
  }, [userDetails]);

  // Render the component with styles applied from the CSS file
  return (
<div className="container_searchBox">
  <div className="searchBarContainer">
    <input
      type="text"
      placeholder="Enter contact number"
      value={contactNumber}
      onChange={(e) => setContactNumber(e.target.value)}
      className="input_searchBox"
    />
  </div>
  
  <button onClick={fetchUserDetails} disabled={loading} className="btn btn-m searchButton">
    {loading ? 'Fetching...' : 'SEARCH'}
  </button>

  {error && <p className="error_searchBox">{error}</p>}
</div>


  );
};

export default SearchBar;
