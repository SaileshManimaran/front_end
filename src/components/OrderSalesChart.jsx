import React from 'react';
import { Bar } from 'react-chartjs-2';

const OrderSalesChart = ({ ordersData }) => {
  const data = {
    labels: ordersData.map(order => order.date),
    datasets: [
      {
        label: 'Orders',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: ordersData.map(order => order.created_at)
      },
      {
        label: 'Sales',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: ordersData.map(order => order.deliveredAmount)
      }
    ]
  };

  const options = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  return <Bar data={data} options={options} />;
};

export default OrderSalesChart;
