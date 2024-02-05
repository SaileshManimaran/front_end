import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import authService from '../services/auth.service';
import SideBar from './Sidebar.component';
import '../styles/tables.css';
import SearchBox from './seachBox.component';
import { useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion';
import setBodyColor from '../funcs/setBodyColor';
import NavBarComponent from './nav-bar.component';
import DeleteCategory from '../funcs/DeleteCategory';
const RedirectButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Redirect to the desired page
    navigate('/addCategory');
  };

  return <button className='btn btn-primary btn-md mt-1' onClick={handleClick}>Add Category</button>;
};


const CategoryComponent = () => {
  const [users, setUsers] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [value,setValue]=useState("");
  const [tempUsers,setTempUsers]=useState([]);
  const [compType,setCompType]=useState('category');
  const[category,setCategory]=useState([]);
  const[categoryCount,setCategoryCount]=useState(0);

  


  const RedirectToEditCategory = ({ category }) => {
    const navigate = useNavigate();
  
    const handleClick = () => {
      console.log(category);
      // Redirect to the desired page with the users prop
      navigate('/editCategory', { state: { category } });
    };
  
    return <button onClick={handleClick} className='editButton'>Edit User</button>;
  };
  const handleCategoryDeleted = (deletedCategoryId) => {
    // Update the categories state by removing the deleted category
    setUsers((prevCategories) => prevCategories.filter((category) => category.id !== deletedCategoryId));
    setCategoryCount((prevCount) => prevCount - 1); // Update category count
  };

  const fetchProfile = useCallback(async () => {
    try {
      const result = await authService.getCategory();
      console.log(result.data);
      setUsers(result.data);
      setTempUsers(result.data);
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
      filteredUsers = tempUsers.filter(user => user.status && user.status.toString().toLowerCase() === selectedValue.toLowerCase());    }
  
    setUsers(filteredUsers);
  };
  
  setBodyColor({imageUrl: "https://img.freepik.com/free-photo/background_53876-32170.jpg?size=626&ext=jpg"})
  return (
    <motion.div initial={{opacity:0}}
    animate={{opacity:1}}
    exit={{opacity:0}}> 
    
      <div>
      <NavBarComponent/>
        <SideBar />

        <div className="row_user" >
    <div className="col-xs-12">
     <div className="card mrg_bottom ">
     
      <div className="col-md-5 col-xs-12">
                    <h4 className='p-2 bd-highlight '>Manage Category</h4>
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
        <SearchBox onSearch={handleSearch} searchActive={searchActive} compType={compType} />
        </div>
        </div>
        {searchActive ? (

          <div initial={{opacity:0}}
          animate={{opacity:1}}
          exit={{opacity:0}}>
            {searchResults.length > 0 ? ( // Check if there are search results
              <div>
                <h2 className="text-center">Search Results</h2>
                {/* Render search results table */}
                <table className="table table-hover table-light">
                <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Status</th>
              
              
              </tr>
            </thead>
                  <tbody>
                    {searchResults.map((result) => (
                      <tr key={result.id}>
                        <td>{result.id}</td>
                        <td>{result.name}</td>

                        <td>{result.status}</td>
                       
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No results found.</p> // Display a message when no results are found
            )}
          </div>
        ) : (
          <div className="col-md-12 mrg-top">
          
            {/* Render user table */}
            <div className='table-responsive'>
            <table className="table table-hover table-light">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
              
                    <th>Status</th>
                    <th>Action</th>
              
              </tr>
            </thead>              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <th scope='row'>{user.id}</th>
                    <td>{user.name}</td>
                    
                    
                    <td>{user.status}</td>
                    <td><RedirectToEditCategory category={user} />
                  <DeleteCategory category={user} onCategoryDeleted={handleCategoryDeleted}/></td>
                   
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

export default CategoryComponent;
