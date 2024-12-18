import React, { useState } from 'react';
import axios from 'axios';

import './SearchStyle.css';

const Search = ({ setChartData }) => {
  const [stockName, setStockName] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Predefined stock suggestions
  const stockSuggestions = ['Google', 'Meta', 'Tesla', 'Nvidia', 'Reliance'];

  const handleStockChange = (e) => {
    const input = e.target.value;
    setStockName(input); // Update stock name input

    // Filter suggestions dynamically based on input
    if (input) {
      const filteredSuggestions = stockSuggestions.filter((stock) =>
        stock.toLowerCase().includes(input.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleStockSearch = async () => {
    if (!stockName) {
      alert('Please enter a stock name!'); // Validate input
      return;
    }

    console.log('Requesting data for:', stockName);

    try {
      // Fetch data from the server
      const response = await axios.get(
        `http://127.0.0.1:5000/chart-data?stock=${stockName}`
      );
      // Update chartData in the parent component
      setChartData(response.data);
    } catch (error) {
      if(error.code=="ERR_NETWORK"){
        alert('SERVER is not up..!! WAIT for while.'); // Validate input
        console.error('Error fetching stock data:', error);
      }
      console.error('Error fetching stock data:', error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setStockName(suggestion); // Set clicked suggestion
    setSuggestions([]); // Clear suggestions
  };

  return (
    <div className='search'>
      <div className="ExploreLink"><u>Explore</u></div>
      <input
        type="text"
        placeholder='What are you looking for today?'
        value={stockName}
        onChange={handleStockChange}
      />
      <button onClick={handleStockSearch}>Search</button>

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)} // Correctly bind click handler
              className="suggestion-item"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
