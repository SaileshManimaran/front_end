import React from 'react';
import toast from 'react-hot-toast';
import { Link, NavLink, useNavigate,useLocation } from 'react-router-dom';
import authService from '../services/auth.service';

const NavBarComponent = () => {
  const location = useLocation();

  // Access the pathname from location
  const { pathname } = location;
  const navigate = useNavigate();
  const authUser = authService.getAuthUser();

  const getActiveClass = ({ isActive }) => isActive ? 'nav-link active' : 'nav-link';

  const handleLogout = async () => { 
    try {
      await authService.logout(); 
      navigate('/');
    } catch (error) {
      toast.error(error);
    }
  }


  return (
    <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom nav-header " >
      <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">

      <h4 className='nav-h1'>LOCAL HELPER</h4>


      </div>
      <ul className="nav nav-pills">
        {
          authUser
            ?
            <>
            <li className="nav-item">
              <div className='nav-container'>
              <Link to={'#'} onClick={handleLogout} className="nav-link active logout-button" style={{ color: 'white', backgroundColor: 'red' }}>Logout</Link>
              </div>
            </li>
            
            <li className="nav-item">
              <div className='nav-container'>
              <Link to={'/profile'} className="nav-link active logout-button" style={{ color: 'white', backgroundColor: 'red',marginLeft:'10px' }}>Profile</Link>
              </div>
            </li>
            </>

            
           
            
            
            :
            <>
              <li className="nav-item">
                <NavLink to={'/'} end className={getActiveClass}>Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={'/register'} end className={getActiveClass}>Register</NavLink>
              </li>
            </>
        }
      </ul>
    </header>
  )
        
}

export default NavBarComponent