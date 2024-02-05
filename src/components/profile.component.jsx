  import React, { useState, useEffect } from 'react';
  import toast from 'react-hot-toast';
  import authService from '../services/auth.service';
  import { useCallback } from 'react';
  import SideBar from './Sidebar.component';
  import setBodyColor from '../funcs/setBodyColor';
  import '../styles/profile.css'
  import { useNavigate } from 'react-router-dom';
  import '../styles/profilePic.css';
  import http from "../utils/http-client";

  const ProfileComponent = () => {
    const handleProfilePictureChange = async (event) => {
      const file = event.target.files[0];
    
      // Check if a file was selected
      if (!file) {
        return;
      }
    
      try {
        // Display the selected image on the client side
        var image = document.getElementById("output");
        image.src = URL.createObjectURL(file);
    
        // Create a FormData object to send the file
        const formData = new FormData();
        formData.append('profilePicture', file);
    
        // Make a POST request to the server endpoint for file upload
        const response = await http.post('/upload', formData);
        if (response.ok) {
          console.log('File uploaded successfully!');
          // You may want to update the user state or trigger a fetchProfile() here
        } else {
          console.error('Failed to upload file. Server response:', response.status);
        }
      } catch (error) {
        console.error('Error uploading file:', error.message);
      }
    };
    

    const RedirectToEditUser = ({ user }) => {
      const navigate = useNavigate();
    
      const handleClick = () => {
        // Redirect to the desired page with the users prop
        navigate('/editUser', { state: { user } });
      };
    
      return <button onClick={handleClick} id='edit-button'>Edit User</button>;
    };

    const [user, setUser] = useState(null);



    const fetchProfile = useCallback (async () => {
      try {
        const result = await authService.profile();
        console.log(result.data)
        setUser(result.data[0])
        console.log(result)
      } catch (error) {
        toast.error(error);
      }
    },[])
    useEffect(() => {
      fetchProfile();
    }, [fetchProfile]);
    setBodyColor({ imageUrl: 'https://img.freepik.com/free-photo/background_53876-32170.jpg?size=626&ext=jpg' });

    return (
      <div className="row">
  <div className="col-2 offset-1">
    <SideBar />
  </div>

  <div className="user-card">
    <div className="user-image">
      {/* Add a user profile picture if available */}
      {user && user.profilePicture ? (
        <div className="profile-pic">
          <label className="-label" htmlFor="file">
            <span className="glyphicon glyphicon-camera"></span>
            <span>Change Image</span>
          </label>
          <input id="file" type="file" onChange={handleProfilePictureChange} />
          <img src={user.profilePicture} id="output" width="200" alt="" />
        </div>
      ) : (
        <div className="profile-pic">
          <label className="-label" htmlFor="file">
            <span className="glyphicon glyphicon-camera"></span>
            <span>Change Image</span>
          </label>
          <input id="file" type="file" onChange={handleProfilePictureChange} />
          <img
            src="https://cdn.pixabay.com/photo/2017/08/06/21/01/louvre-2596278_960_720.jpg"
            id="output"
            width="200"
            alt=""
          />
        </div>
      )}
    </div>
    <div className="user-details">
      <p className="user-name" style={{fontWeight:"bolder", font:""}}>
{user?.name}
      </p>
      <p className="user-email">
        <span className="label_profile" style={{fontWeight:"bolder"}}>Email:</span> {user?.email}
      </p>
      <p className="user-email">
        <span className="label_profile" style={{fontWeight:"bolder"}}>Contact:</span> {user?.contactNumber}
      </p>
      {/* Add more user details as needed */}
    </div>
    <RedirectToEditUser user={user} />
  </div>
</div>

    );
  }

  export default ProfileComponent;
