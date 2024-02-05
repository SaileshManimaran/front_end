import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList
}from "react-icons/fa";
import { FaCartShopping,FaArrowDownAZ } from "react-icons/fa6";
import { MdCleaningServices } from "react-icons/md";
import { MdEngineering } from "react-icons/md";
import '../styles/sideBar.css';


import { NavLink } from 'react-router-dom';


const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/dashboard",
            name:"Dashboard",
            icon:<FaTh/>
        },
        {
            path:"/users",
            name:"user",
            icon:<FaUserAlt/>
        },
       
        {
            path:"/category",
            name:"categories",
            icon:<FaShoppingBag/>
        },
        {
            path:"/address",
            name:"Address",
            icon:<FaThList/>
        },
        {
            path:"/order",
            name:"Orders",
            icon:<FaCartShopping/>,
            subCategories: [
                {
                  path: "/categories/electronics",
                  name: "Electronics",
                },
                {
                  path: "/categories/clothing",
                  name: "Clothing",
                },
                // Add more subcategories as needed
              ]
        },{
            path:"/subCategory",
            name:"Sub Category",
            icon:<FaArrowDownAZ />


        },
        {
            path:"/service",
            name:"Service",
            icon:<MdCleaningServices />

        }
        ,{
            path:"/vendor",
            name:"Vendors",
            icon:<MdEngineering />

        }

        
    ]
    return (
        <div className="container">
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div className="top_section">
               <a href="/dashboard"><img src="logo.png" alt="HTML tutorial" /></a>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" >
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
        </div>
    );
};

export default Sidebar;