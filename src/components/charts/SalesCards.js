import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import '../../styles/salesCard.css';
import SalesReportChart from './salesReportChart';
import SalesReportDailyChart from './salesReportDaily';

const SalesCard = ({ salesData ,userCount}) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const[totalOrderCount,setTotalOrderCount]=useState(0);
 
  const onDateChange=(totalOrders)=>{
    setTotalOrderCount(totalOrders);

  }
  return (
    <div>
      <link href="https://netdna.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" rel="stylesheet"/>
      <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"/>
      <div className="container">
        <div className="scrollable-cards-container">
          <div className="card bg-c-yellow order-card">
            <div className="card-block">
              <h4 className="m-b-20">Sales Analytics</h4>
            <hr className='cardhead'/>
              
              <SalesReportChart salesData={salesData}/>
              <h6 className="text-right"><i className="fa fa-cart-plus f-left"></i><span>Total orders:{userCount}</span></h6>
            </div>
          </div>
          <div className="card bg-c-green order-card">
            <div className="card-block">
              <h4 className="m-b-20">Daily Sales Graph</h4>
              <hr className='cardhead'/>

              <SalesReportDailyChart salesData={salesData} onDateChange={onDateChange}/>
            </div>
          </div>
          {/* <div className="card bg-c-yellow order-card">
            <div className="card-block">
              <h6 className="m-b-20">Orders Received</h6>
              <h2 className="text-right"><i className="fa fa-refresh f-left"></i><span>486</span></h2>
              <p className="m-b-0">Completed Orders<span className="f-right">351</span></p>
            </div>
          </div>
          <div className="card bg-c-pink order-card">
            <div className="card-block">
              <h6 className="m-b-20">Orders Received</h6>
              <h2 className="text-right"><i className="fa fa-credit-card f-left"></i><span>486</span></h2>
              <p className="m-b-0">Completed Orders<span className="f-right">351</span></p>
            </div>
          </div> */}
        </div>
      </div>
      <script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
      <script src="https://netdna.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js"></script>
      <script type="text/javascript">
        
      </script>
    </div>
  );
};

export default SalesCard;
