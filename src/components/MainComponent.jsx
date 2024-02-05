// MainComponent.jsx
import React, { useState } from 'react';
import UserComponent from '../components/user.component';
import DashboardComponent from './dashboard.component';

const MainComponent = () => {
  const [userCount, setUserCount] = useState(0);

  const handleUserCountUpdate = (count) => {
    setUserCount(count);
  };


  return (
    <div>
      
      <DashboardComponent userCount={userCount} onUserCountUpdate={handleUserCountUpdate}/>
    </div>
  );
};

export default MainComponent;
