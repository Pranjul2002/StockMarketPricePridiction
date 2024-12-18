import React, { useState } from 'react';
import "chart.js/auto";
import { Line } from 'react-chartjs-2';
import axios from 'axios';

import '../Chart/ChartComponentStyle.css';
import Home from '../Home/Home'


const ChartComponent = ({ data }) => {
  const [year, setYear] = useState('');
  //const [isLoading, setIsLoading] = useState(false);
  const [predictedPrice, setPredictedPrice] = useState('');
  const [displayedPredictedPrice, setDisplayedPredictedPrice] = useState(''); // New state for display
  const [stockName,setStockName]=useState('');

  if (!data) {
    return(
      <div>
        <Home/>
      </div>
    );
  }

  //console.log("--------------datapoints- ",data.dataset);
  //console.log("--------------labels- ",data.labels);

  const chartConfig = {
    labels: data.labels, // X-axis labels (dates)
    datasets: [
      {
        label: 'Stock Price',
        data: data.dataset, // Y-axis values (stock prices)
        borderColor: 'rgb(1, 138, 104)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 4, // Adjust thickness
        pointRadius: 0, // Show points at data positions
        fill: true,
      },
    ],
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handlePredictClick = () => {
    if (!year) {
      alert('Please enter a year!');
      return;
    }

    axios.post('http://127.0.0.1:5000/predict-year', { year })
      .then(response => {
        const { predicted_prices } = response.data;
        setPredictedPrice(predicted_prices);
        setDisplayedPredictedPrice(predicted_prices); // Set value for display

        setPredictedPrice('');
      })
      .catch(error => {
        console.error('Error fetching prediction data:', error);
      });
  };

  const options = {
    responsive: true,
    scales: {
      x: { display: false },
      y: { display: true },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true, // Enable tooltips
        mode: 'index', // Show tooltip for the closest data point
        intersect: false, // Show tooltip even if not directly hovering over a point
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw;
            return `${value.toFixed(5)}`;
          },
        },
      },
    },
  };

  return (
    <div className='chartComponent'>
      
      <div className="chartWrapper">
        <Line data={chartConfig} options={options} />
      </div>

      <div className="stockLeftBox">
        <div className="stockName">
          {data.stock_name}
        </div>

        <div className="priceforyear">
          <label>Year you want to predict</label>
          <input
            type="text"
            value={year}
            placeholder='Year'
            onChange={handleYearChange}
          />
          <br />

          <button onClick={handlePredictClick}><p>Predict</p></button>
          <div className="predictedValue">
            Predicted value is: {displayedPredictedPrice}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ChartComponent;
