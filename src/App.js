import React, { useEffect, useState } from 'react';
import './App.css';

// Tiingo API key and URL for fetching stock prices
const apiKey = '55507a823c51d7bef567c5def36ae150da260b3a';

function App() {
  const [ticker, setTicker] = useState("AAPL"); // Defaults to Apple
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

        // Handle and set the API response
        setData(result);
      } catch (err) {
        setError(err.message);
        console.error('Fetch error:', err);
      }
    };

    fetchData();
  }, [ticker]); // runs when ticker changes

  // User input for search bar
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
    setSuggestions([]);
  };

  return (
    <main>
      <div className="container" id="home-page">
        <div className="main-content">
          <div id="details">
            <h1>Stock Data</h1>

            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search for a stock..."
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
            />

            {/* Suggestions Dropdown */}
            {suggestions.length > 0 && (
              <ul className='suggestions'>
                {suggestions.map((suggestion) => (
                  <li key={suggestion} onClick={() => handleSelectTicker(suggestion)}>
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
                  <tbody>
                    <tr>
                      <th>Date</th>
                      <td>{new Date(data.date).toLocaleDateString()}</td>
                    </tr>
                    <tr>
                      <th>Open</th>
                      <td>${data.open}</td>
                    </tr>
                    <tr>
                      <th>Close</th>
                      <td>${data.close}</td>
                    </tr>
                    <tr>
                      <th>High</th>
                      <td>${data.high}</td>
                    </tr>
                    <tr>
                      <th>Low</th>
                      <td>${data.low}</td>
                    </tr>
                    <tr>
                      <th>Volume</th>
                      <td>{data.volume.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <th>Percentage Change</th>
                      <td
                        style={{
                          color: data.percentageChange >= 0 ? "green" : "red",
                        }}
                      >
                        {data.percentageChange}%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
