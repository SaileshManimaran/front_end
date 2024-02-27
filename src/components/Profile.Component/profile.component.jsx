import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import authService from '../../services/auth.service';
import { useCallback } from 'react';
import SideBar from '../Sidebar.component';
import setBodyColor from '../../funcs/setBodyColor';
import '../../styles/profile.css'
import { useNavigate } from 'react-router-dom';
import http from "../../utils/http-client";
import ProfilePictureComponent from './ProfilePicture.Component';

const ProfileComponent = () => {
  const [user, setUser] = useState(null);

  const fetchProfile = useCallback(async () => {
    try {
      const result = await authService.profile();
      setUser(result.data[0]);
    } catch (error) {
      toast.error(error);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleProfilePictureChange = async (event) => {
    const file = event.target.files[0];
  
    if (!file) {
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('profilePicture', file);
      formData.append('customerId', user.id);
  
      const response = await http.post('/profile/uploadProfilePicture', formData);
  
      if (response.statusText === "OK") {
        console.log('File uploaded successfully!');
        fetchProfile(); // Refresh user data after successful upload
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
      navigate('/editUser', { state: { user } });
    };

    return <button onClick={handleClick} id='edit-button'>Edit User</button>;
  };

  return (
    <div className="row">
      <div className="col-2 offset-1">
        <SideBar />
      </div>

      <div className="user-card">
        <div className="user-image">
          {/* {!user ? (
            <div className="profile-pic">
              <label className="-label" htmlFor="file">
                <span className="glyphicon glyphicon-camera"></span>
                <span>Change Image</span>
              </label>
              <input id="file" type="file" onChange={handleProfilePictureChange} />
              <ProfilePictureComponent userId={user.id} />
            </div>
          ) : ( */}
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
          {/* )} */}
        </div>
        <div className="user-details">
          <p className="user-name" style={{ fontWeight: "bolder" }}>{user?.name}</p>
          <p className="user-email">
            <span className="label_profile" style={{ fontWeight: "bolder" }}>Email:</span> {user?.email}
          </p>
          <p className="user-email">
            <span className="label_profile" style={{ fontWeight: "bolder" }}>Contact:</span> {user?.contactNumber}
          </p>
        </div>
        <RedirectToEditUser user={user} />
      </div>
    </div>
  );
}

export default ProfileComponent;
