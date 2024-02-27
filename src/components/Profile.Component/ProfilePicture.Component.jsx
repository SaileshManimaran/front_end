import React, { useState, useEffect } from 'react';
import http from '../../utils/http-client';

const ProfilePictureComponent = ({ userId }) => {
  const [profilePictureUrl, setProfilePictureUrl] = useState('');

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        // Make a GET request to fetch the profile picture URL
        const response = await http.get(`/profile/profilePicture/${userId}`, {
          responseType: 'arraybuffer', // Set response type to arraybuffer to handle binary data
        });

        console.log('Response:', response); // Log the response
        
        if (response.statusText === "OK") {
          // Convert the received image data to a blob URL
          const imageData = response.data;
          const byteArray = new Uint8Array(imageData.length);
          for (let i = 0; i < imageData.length; i++) {
            byteArray[i] = imageData.charCodeAt(i);
          }
          const blob = new Blob([byteArray], { type: 'image/jpeg' });
          const imageUrl = URL.createObjectURL(blob);
          
          console.log('Image URL:', imageUrl); // Log the image URL

          // Set the profile picture URL
          setProfilePictureUrl(imageUrl);
        } else {
          console.error('Failed to fetch profile picture.');
        }
      } catch (error) {
        console.error('Error fetching profile picture:', error.message);
      }
    };
    
    console.log('Fetching profile picture for userId:', userId); // Log the userId
    fetchProfilePicture();
  }, [userId]);

  console.log('Profile Picture URL:', profilePictureUrl); // Log the profile picture URL

  return (
    <div>
      {profilePictureUrl && <img src={profilePictureUrl} alt="Profile Picture" />}
    </div>
  );
};

export default ProfilePictureComponent;
