import React, { useEffect, useState } from 'react';
import './App.css';

// Tiingo API key and URL for fetching stock prices
const apiKey = '55507a823c51d7bef567c5def36ae150da260b3a';

function App() {
  const [ticker, setTicker] = useState("AAPL") // Defaults to Apple
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Input for search bar
  const [suggestions, setSuggestions] = useState([]); // search suggestions

  const stockTickers = ["AAPL", "GOOGL", "MSFT", "AMZN", "TSLA", "META", "NFLX", "NVDA"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from Tiingo API
        const response = await fetch(
          `http://localhost:5000/api/stock/${ticker}`,
          {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();

        setData(result);
      } catch (err) {
        setError(err.message);
        console.error('Fetch error:', err);
      }
    };

    fetchData();
  }, [ticker]); // runs when ticker changes

  //user input for search bar
  const handleSearchChange = (e) => {
    const value = e.target.value.toUpperCase();
    setSearchTerm(value);

    setSuggestions(stockTickers.filter(ticker => ticker.startsWith(value)));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (suggestions.length > 0) {
        setTicker(suggestions[0]);
      } else if (searchTerm) {
        setTicker(searchTerm);
      }
    }
  };

  const handleSelectTicker = (selectedTicker) => {
    setTicker(selectedTicker);
    setSearchTerm("");
    setSuggestions([])
  };


  

  return (
    <div className="App">    
      

      <h1>Stock Data</h1>

      {/* Search Bar */}
      <input
        type = "text"
        placeholder = "Search for a stock..."
        value = {searchTerm}
        onChange = {handleSearchChange}
        onKeyDown={handleKeyDown}
      />

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <ul className='suggestions'>
          {suggestions.map((suggestion) => (
            <li key = {suggestion} onClick={() => handleSelectTicker(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}

      {/* Display Stock Data */}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {data ? (
        <div className="stock-data">
          <h2>{data.ticker}</h2>
          <p><strong>Date:</strong> {data.date}</p>
          <p><strong>Open:</strong> ${data.open}</p>
          <p><strong>Close:</strong> ${data.close}</p>
          <p><strong>High:</strong> ${data.high}</p>
          <p><strong>Low:</strong> ${data.low}</p>
          <p><strong>Volume:</strong> {data.volume}</p>
          <p>
            <strong>Percentage Change:</strong>{" "}
            <span
              style={{
                color: data.percentageChange >= 0 ? "green" : "red",
              }}
            >
              {data.percentageChange}%
            </span>
          </p>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Open</th>
                  <th>Close</th>
                  <th>High</th>
                  <th>Low</th>
                  <th>Volume</th>
                  <th>Percentage Change</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{data.date}</td>
                  <td>${data.open}</td>
                  <td>${data.close}</td>
                  <td>${data.high}</td>
                  <td>${data.low}</td>
                  <td>{data.volume}</td>
                  <td>{data.percentageChange}%</td>
                </tr>
              </tbody>
            </table>
        </div>
      ) : (
        <p>Loading...</p>
      )}    

    </div>

  );
}

export default App;
