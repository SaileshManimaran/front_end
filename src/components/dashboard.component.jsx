import React, { useEffect, useState } from 'react';
import CardComponent from '../components/CardComponenet';
import '../styles/dashboard.css';
import { color, motion } from 'framer-motion';
import NavBarComponent from './nav-bar.component';
import Sidebar from './Sidebar.component';
import authservice from '../services/auth.service';
import UserComponent from './user.component';
import http from '../utils/http-client';
import { Link } from 'react-router-dom';
import setBodyColor from '../funcs/setBodyColor';
import OrderSalesChart from './OrderSalesChart';
import SalesReportChart from './charts/salesReportChart';
import SalesReportDailyChart from './charts/salesReportDaily';
import SalesCards from './charts/SalesCards';
import PerfectScrollbar from 'react-perfect-scrollbar';


const DashboardComponent = () => {
  const [userCount, setUserCount] = useState(0);
  const [CategoryCount, setCategoryCount] = useState(0);
  const [ServiceCount,setServiceCount]=useState(0);
  const [SubcatCount,setSubcatCount]=useState(0);
  const [orderData,setOrderData]=useState([]);

  useEffect(() => {
    // Fetch user count asynchronously
    const fetchUserCount = async () => {
      try {
        const response = await http.get('/count');
        const result=await http.get('/countCategory');
        const resultService=await http.get('service/countService');
        const resultSubcat=await http.get('subcat/countSubcat');
        const resp=await http.get('order/get');
        setOrderData(resp.data);
        console.log(orderData);
        setCategoryCount(result.data[0]['COUNT(id)']);
        setUserCount(response.data[0]['COUNT(id)']);
        setServiceCount(resultService.data[0]['COUNT(service_id)']);
        setSubcatCount(resultSubcat.data[0]['COUNT(id)'])
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };

    fetchUserCount();
  }, []); // Empty dependency array ensures the effect runs only once after initial render

  // Ensure to include setBodyColor within the component logic
  useEffect(() => {
    setBodyColor({ imageUrl: 'https://img.freepik.com/free-photo/background_53876-32170.jpg?size=626&ext=jpg' });
  }, []);
  
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    style={{ minHeight: '100vh' }}
    >
      <div className="dashboard-cls">
        <NavBarComponent />
        <Sidebar />
    
        <PerfectScrollbar>

        <div className="card-container-cls" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'scroll' }}>
          <Link to={'/users'} style={{ textDecoration: 'none' }}>
            <CardComponent title="Categories" content={`Total Categories: ${CategoryCount}`}  path="https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/four-squares-icon.png"/> 
          </Link>              
          <Link to={'/users'} style={{ textDecoration: 'none' }}>
            <CardComponent title="Users" content={`Total Users: ${userCount}`} path={'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'}  />
          </Link>

          <Link to={'/order'} style={{ textDecoration: 'none' }}>
            <CardComponent title="Order" content={`Total Users: ${userCount}`} path={'https://cdn.iconscout.com/icon/premium/png-256-thumb/cart-2693996-2235912.png'}  />
          </Link>
          <Link to={'/service'} style={{ textDecoration: 'none' }}>
            <CardComponent title="Services" content={`Total Services: ${ServiceCount}`} path={'https://www.pngall.com/wp-content/uploads/4/Gear-Transparent.png'} />
          </Link>
          <Link to={'/subcategory'} style={{ textDecoration: 'none' }}>
            <CardComponent title="SubCategory" content={`Total Users: ${SubcatCount}`} path={'https://cdn3.iconfinder.com/data/icons/modern-business-6-solid/128/diagram_blueprint_hierarchy_organization_database_layout_chart_draft_circular_graph_infrogaphics-128.png'} />
          </Link>
          {/* <Link to={'/vendor'} style={{ textDecoration: 'none' }}>
            <CardComponent title="Vendor" content={`Total Vendors: ${SubcatCount}`} path={'https://cdn4.iconfinder.com/data/icons/business-management-86/64/vendor-seller-merchant-dealer-trader-256.png'} />
          </Link> */}
          
        </div>
        </PerfectScrollbar>

        {/* <div className="chart-container" style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="chart-wrapper">
            <h4 style={{  }}>Order and Sales Chart</h4>
            <SalesReportChart salesData={orderData} />
          </div> */}
          {/* <div className="chart-wrapper">
            <h4 style={{ textAlign: 'center' }}>Daily Sales Chart</h4>
            <SalesReportDailyChart salesData={orderData} />
          </div> */}
        {/* </div> */}
          <div>  <SalesCards salesData={orderData} userCount={userCount}/></div>
      </div>
    </motion.div>
  );
};

export default DashboardComponent;
