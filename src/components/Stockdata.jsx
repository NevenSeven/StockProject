// Stockdata.js
import React, { useEffect, useState } from 'react';
import TradingViewWidget from '../pages/tradeview/TradingViewWidget';
import SearchBar from './SearchBar';

const Stockdata = () => {
  const [ticker, setTicker] = useState("AAPL");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [tickersList, setTickersList] = useState([]); // ✅ new state
  const [date, setDate] = useState(""); // Date in YYYY-MM-DD format

  const [sp500Data, setSP500Data] = useState(null);
  const [sp500Error, setSP500Error] = useState(null);

  const [nasdaqData, setNasdaqData] = useState(null);
  const [nasdaqError, setNasdaqError] = useState(null);

  // ✅ Fetch tickers list on load
  useEffect(() => {
    const fetchTickers = async () => {
      try {
        const response = await fetch("/tickers.txt");
        const text = await response.text();
        console.log("Tickers raw response:", text);

        const tickers = text
          .split("\n")
          .map(t => t.trim())
          .filter(Boolean);

        setTickersList(tickers);
      } catch (err) {
        console.error("Failed to fetch tickers list:", err);
      }
    };

    fetchTickers();
  }, []);
  
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('watchlist');
    return saved ? JSON.parse(saved) : [];
  });

  const toggleWatchlist = () => {
    const updated = watchlist.includes(ticker)
      ? watchlist.filter(t => t !== ticker)
      : [...watchlist, ticker];
  
    setWatchlist(updated);
    localStorage.setItem('watchlist', JSON.stringify(updated));
  };
  

  // ✅ Fetch stock data when ticker changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams({ ticker });
        if (date) params.append("date", date);
  
        const endpoint = `https://stockstalker.vercel.app/api/stock?${params.toString()}`;
        const response = await fetch(endpoint);
  
        if (!response.ok) {
          throw new Error(`Error fetching stock data: ${response.status} - ${response.statusText}`);
        }
  
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
        setData(null);
      }
    };
  
    if (ticker) {
      fetchData();
    }
  }, [ticker, date]);
  

  // Fetch index data once
  useEffect(() => {
    const fetchIndices = async () => {
      try {
        const response = await fetch("/api/indices");
        const result = await response.json();
        setSP500Data(result.sp500);
        setNasdaqData(result.nasdaq);
      } catch (err) {
        console.error("Index fetch error:", err);
      }
    };
  
    fetchIndices();
  }, []);

  // Handle input
  const handleSearchChange = (e) => {
    const value = e.target.value.toUpperCase();
    setSearchTerm(value);

    if (!value) {
      setSuggestions([]);
      return;
    }

    const filtered = tickersList
        .filter(t => t.startsWith(value))
        .slice(0, 7) // limit to 7 suggestions

    setSuggestions(filtered);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault(); // prevent page reload on submit
    if (suggestions.length > 0) {
      setTicker(suggestions[0]);
    } else if (searchTerm) {
      setTicker(searchTerm);
    }
  };

  const handleSelectTicker = (ticker) => {
    setTicker(ticker);
    setSearchTerm("");
    setSuggestions([]);
  };

  return (
    <div className="container-fluid text-center">
      <div className="App">
        {/* Market Indices */}
        <div className="row">
          <table className="table table-success table-striped-columns">
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

        <SearchBar
        searchTerm={searchTerm}
        suggestions={suggestions}
        handleSearchChange={handleSearchChange}
        handleKeyDown={handleKeyDown}
        handleSubmit={handleSubmit}
        handleSelectTicker={handleSelectTicker}/>

          {/* Date Picker */}
          <div className="mb-3">
            <label htmlFor="datePicker" className="form-label">Select Date:</label>
            <input
              type="date"
              id="datePicker"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        

        {/* Stock Info Table */}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        {data ? (
          <div className="stock-data">
            <h2>{data.ticker}</h2>
            <div className="table-responsive">
            <table className="table table-success table-striped-columns">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Open</th>
                  <th>Close</th>
                  <th>High</th>
                  <th>Low</th>
                  <th>Volume</th>
                  <th>Change %</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{data.date.split('T')[0]}</td>
                  <td>${data.open}</td>
                  <td>${data.close}</td>
                  <td>${data.high}</td>
                  <td>${data.low}</td>
                  <td>{data.volume}</td>
                  <td>
                    <span style={{ background: data.percentageChange >= 0 ? "green" : "red", color: "white", padding: "0 5px", borderRadius: "5px" }}>
                      {data.percentageChange}%
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            </div>

          </div>
        ) : (
          <p>Loading stock data...</p>
        )}

        <button className="btn btn-warning mb-3" onClick={toggleWatchlist}>
          {watchlist.includes(ticker) ? '★ Pinned to Watchlist' : '☆ Pin to Watchlist'}
        </button>


        <div style={{ height: "450px", width: "100%", marginTop: "20px" }}>
          <TradingViewWidget symbol={`NASDAQ:${ticker}`} />
        </div>
      </div>
    </div>
  );
};

export default Stockdata;
