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

  // Separate state for S&P500 and NASDAQ
  const [sp500Data, setSP500Data] = useState(null);
  const [sp500Error, setSP500Error] = useState(null);

  const [nasdaqData, setNasdaqData] = useState(null);
  const [nasdaqError, setNasdaqError] = useState(null);

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

  //fetch data for NASDAQ and S&P500
  useEffect(() => {
    const fetchIndicesData = async () => {
      try {
        // Fetch S&P 500 data
        const sp500Response = await fetch(`http://localhost:5000/api/stock/RYSOX`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (!sp500Response.ok) {
          throw new Error(`Error fetching S&P 500: ${sp500Response.status} ${sp500Response.statusText}`);
        }
  
        const sp500Result = await sp500Response.json();
        console.log("Fetched S&P500 data:", sp500Result);
        setSP500Data(sp500Result);
  
        // Fetch NASDAQ data
        const nasdaqResponse = await fetch(`http://localhost:5000/api/stock/NDAQ`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (!nasdaqResponse.ok) {
          throw new Error(`Error fetching NASDAQ: ${nasdaqResponse.status} ${nasdaqResponse.statusText}`);
        }
  
        const nasdaqResult = await nasdaqResponse.json();
        console.log("Fetched NASDAQ data:", nasdaqResult);
        setNasdaqData(nasdaqResult);
  
      } catch (err) {
        console.error("Error fetching index data:", err);
        setSP500Error(err.message);
        setNasdaqError(err.message);
      }
    };
  
    fetchIndicesData();
  }, []);

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
      
      <div className="Dashboard">
      <table>
              <thead>
                <tr>
                  <th>S&P500</th>
                  <th>{sp500Data ? `$${sp500Data.close}` : "Loading..."}</th>
                  <th>NASDAQ</th>
                  <th>{nasdaqData ? `$${nasdaqData.close}` : "Loading..."}</th>
                </tr>
              </thead>
      </table>
      </div>

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
                  <td><span
              style={{
                color: data.percentageChange >= 0 ? "green" : "red",
              }}
            >
              {data.percentageChange}%
            </span></td>
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
