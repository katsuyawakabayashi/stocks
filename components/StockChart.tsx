'use client'
import Image from "next/image";
import React, { useState, useEffect } from 'react';
import { CChart } from '@coreui/react-chartjs';

const StockChart = ({ stockDataOne, stockDataTwo, tickerNameOne, tickerNameTwo }) => {
    const parsedDataOne = typeof stockDataOne === 'string' ? JSON.parse(stockDataOne) : stockDataOne;
    const parsedDataTwo = typeof stockDataTwo === 'string' ? JSON.parse(stockDataTwo) : stockDataTwo;
  
    const labels = Object.keys(parsedDataOne.Open).map((timestamp) =>
      new Date(parseInt(timestamp)).toLocaleDateString("en-US")
    );
  
    const data = {
      labels,
      datasets: [
        {
          label: `${tickerNameOne} Open Price`,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          data: Object.values(parsedDataOne.Open),
          yAxisID: 'y',
        },
        {
          label: `${tickerNameTwo} Open Price`,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          
          borderWidth: 1,
          data: Object.values(parsedDataTwo.Open),
          yAxisID: 'y',
        }
      ],
    };
  
    const options = {
      scales: {
        yAxis: {
          beginAtZero: true,
          position: 'right',
        },
      },
      interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false
      },
    };
    
  
    return <div className="w-full h-auto px-2 xs:px-6">
      <CChart
        type="line"
        data={data}
        options={options}
      />
    </div>;
  };

  export default StockChart