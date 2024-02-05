// CardComponent.jsx
import React from 'react';
import '../styles/dashboard.css';


const CardComponent = ({ title, content,path }) => {
  return (
    <div className="card-cls">
      <div className='card-content'>
        <img src={path} alt="user" />
      <h3 >{title}</h3>
           <p style={{"color":"black"}}>{content}</p>
           </div>
   
    </div>
  );
};

export default CardComponent;
