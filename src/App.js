import React, { useEffect, useState } from 'react';
import './App.css';

// Tiingo API key and URL for fetching stock prices
const apiKey = '55507a823c51d7bef567c5def36ae150da260b3a';
const apiUrl = `/tiingo/daily/AAPL/prices?token=${apiKey}`;

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from Tiingo API
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();

        // Extract the latest stock price (first item in the array)
        const latestPrice = result[0]?.close;
        const latestDate = result[0]?.date;

        if (latestPrice) {
          // Update state with the extracted data
          setData({
            price: latestPrice,
            date: latestDate,
          });
        } else {
          setError('Could not retrieve the price.');
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Stock Data</h1>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <pre>
        {data
          ? `Current Price: $${data.price} (Last updated: ${data.date})`
          : 'Loading...'}
      </pre>
    </div>
  );
}

export default App;
