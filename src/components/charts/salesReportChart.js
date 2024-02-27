import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const SalesReportChart = ({ salesData }) => {
  const overallChartContainer = useRef(null);
  const categoryChartContainer = useRef(null);
  const overallChartInstance = useRef(null);
  const categoryChartInstance = useRef(null);
  const [totalSales, setTotalSales] = useState(0);
  const [categorySales, setCategorySales] = useState({});

  useEffect(() => {
    if (!salesData || salesData.length === 0) {
      return; // Do not render the charts if salesData is not defined or empty
    }

    // Convert datetime strings to date strings
    const modifiedSalesData = salesData.map(item => ({
      ...item,
      created_at: new Date(item.created_at).toLocaleDateString() // Converting to Date object and then getting the date part
    }));

    const renderOverallChart = () => {
      if (overallChartInstance.current) {
        overallChartInstance.current.destroy();
      }

      const ctx = overallChartContainer.current.getContext('2d');

      const labels = modifiedSalesData.map(item => item.created_at);
      const data = modifiedSalesData.map(item => item.deliveredAmount);

      overallChartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Sales Amount',
            data: data,
            borderColor: 'blue',
            tension: 0.1,
            fill: false
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: 'white', // Set tick color to white
              },
              grid: {
                color: 'white', // Set grid color to white
              }
            },
            x: {
              ticks: {
                color: 'white', // Set tick color to white
              },
              grid: {
                color: 'white', // Set grid color to white
              }
            }
          }
        }
      });

      // Calculate total sales
      const total = data.reduce((acc, curr) => acc + curr, 0);
      setTotalSales(total);
    };

    const renderCategoryChart = () => {
      if (categoryChartInstance.current) {
        categoryChartInstance.current.destroy();
      }

      const ctx = categoryChartContainer.current.getContext('2d');

      // Prepare data for the category chart
      const labels = Object.keys(categorySales);
      const data = Object.values(categorySales).map(category => category.totalSales);

      categoryChartInstance.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            label: 'Category Sales',
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)'
            ],
          }]
        }
      });
    };

    renderOverallChart();
    renderCategoryChart();

    return () => {
      if (overallChartInstance.current) {
        overallChartInstance.current.destroy();
      }
      if (categoryChartInstance.current) {
        categoryChartInstance.current.destroy();
      }
    };
  }, [salesData, categorySales]);

  // Calculate sales for each category and total sales for each category
  useEffect(() => {
    if (!salesData || salesData.length === 0) {
      return;
    }

    const newCategorySales = salesData.reduce((acc, curr) => {
      const categoryName = curr.category_name;
      acc[categoryName] = acc[categoryName] || { totalSales: 0 };
      acc[categoryName].totalSales += curr.deliveredAmount;
      return acc;
    }, {});
    setCategorySales(newCategorySales);
  }, [salesData]);

  return (
    <div>
      

      
      <h2 className="m-b-0" style={{color:"blanchedalmond"}}>Total Sales<span className="f-right">₹{totalSales}</span></h2>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>


        <div style={{ width: '50%', minWidth: '400px' }}>
          <canvas ref={overallChartContainer} />
          <p style={{ color: 'black', textAlign: 'center' }}>Overall Sales Graph</p>
        </div>
        <div style={{ width: '1%', minWidth: '280px', maxWidth:'300px'}}>
          <canvas ref={categoryChartContainer} totalSales={totalSales} />
        </div>
      </div>



    </div>
  );
};

export default SalesReportChart;
