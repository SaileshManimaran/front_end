import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import authService from '../../services/auth.service';

const SalesReportDailyChart = ({ salesData }) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0); // State to hold total orders count
  const [totalSales, setTotalSales] = useState(0); // State to hold total sales amount

  useEffect(() => {
    // Set default selected date to today
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
  }, []);

  useEffect(() => {
    if (!salesData || salesData.length === 0) {
      return;
    }

    // Extract unique dates from salesData
    const uniqueDates = Array.from(new Set(salesData.map(item => item.created_at.split('T')[0])));
    const formattedOrders = uniqueDates.map(date => ({
      date,
      orders: salesData.filter(item => item.created_at.split('T')[0] === date)
    }));
    setFilteredOrders(formattedOrders);
  }, [salesData]);

  useEffect(() => {
    if (!selectedDate || !filteredOrders || filteredOrders.length === 0) {
      return;
    }

    const ordersForSelectedDate = filteredOrders.find(item => item.date === selectedDate);

    if (!ordersForSelectedDate) {
      return;
    }

    const orderLabels = ordersForSelectedDate.orders.map(order => order.id);
    const orderData = ordersForSelectedDate.orders.map(order => order.deliveredAmount);

    // Calculate total orders count for the selected date
    const total = ordersForSelectedDate.orders.length;
    setTotalOrders(total);

    // Calculate total sales amount for the selected date
    const totalSalesAmount = ordersForSelectedDate.orders.reduce((acc, order) => acc + order.deliveredAmount, 0);
    setTotalSales(totalSalesAmount);

    // Render chart for the selected date
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartContainer.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: orderLabels,
        datasets: [{
          label: `Sales Report for ${selectedDate}`,
          data: orderData,
          backgroundColor: 'blue',
          barThickness: 20 // Adjust bar thickness as needed
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: 'rgba(255, 255, 255, 0.499)' // Set tick color to white
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.499)' // Set grid color to white
            }
          },
          x: {
            ticks: {
              color: 'rgba(255, 255, 255, 0.499)' // Set tick color to white
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.499)' // Set grid color to white
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [selectedDate, filteredOrders]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div>
      <h2 className="m-b-0" style={{color:"blanchedalmond"}}>
        Total Sales<span className="f-right">{totalSales}</span>
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <select onChange={handleDateChange} value={selectedDate} style={{
          marginBottom: '1rem',
          padding: '0.5rem', // Adjust padding as needed
          borderRadius: '5px', // Rounded corners
          // Gray border
          backgroundColor: '#66000000', // Light gray background
          color: 'black', // Black text color
          fontSize: '1rem', // Font size
          cursor: 'pointer' // Cursor style
        }}>
          {filteredOrders.map(({ date }) => (
            <option key={date} value={date}>{date}</option>
          ))}
        </select>
        <div style={{ width: '1%', minWidth: '600px' }}>
          <canvas ref={chartContainer} />

        </div>
      </div>
          <p className="m-b-0">Orders today<span className="f-right"></span></p>
          <h2 className="text-right"><i className="fa fa-rocket f-left"></i><span>{totalOrders}</span></h2>

    </div>
  );
};

export default SalesReportDailyChart;
