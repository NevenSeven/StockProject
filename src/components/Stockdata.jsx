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
        let response, result;

        if (!date) {
          // ✅ Use Finnhub for real-time data
          response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=d0nnks9r01qn5ghksi8gd0nnks9r01qn5ghksi90`);
          if (!response.ok) throw new Error("Finnhub fetch failed");
          result = await response.json();

          setData({
            ticker,
            date: new Date().toISOString(),
            open: result.o,
            close: result.c,
            high: result.h,
            low: result.l,
            volume: 0,
            percentageChange:
              result.pc && result.c
                ? (((result.c - result.pc) / result.pc) * 100).toFixed(2)
                : null,
          });

        } else {
          // 🕰 Use Tiingo via your backend for historical data
          const params = new URLSearchParams({ ticker, date });
          response = await fetch(`https://stockstalker.vercel.app/api/stock?${params.toString()}`);
          if (!response.ok) throw new Error("Tiingo fetch failed");
          result = await response.json();

          setData(result);
        }

        setError(null);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
        setData(null);
      }
    };

    if (ticker) fetchData();
  }, [ticker, date]);

  

  // Fetch index data once
  useEffect(() => {
  const fetchIndices = async () => {
    try {
      const [sp500Res, nasdaqRes] = await Promise.all([
        fetch("https://finnhub.io/api/v1/quote?symbol=SPY&token=d0nnks9r01qn5ghksi8gd0nnks9r01qn5ghksi90"),
        fetch("https://finnhub.io/api/v1/quote?symbol=QQQ&token=d0nnks9r01qn5ghksi8gd0nnks9r01qn5ghksi90"),
      ]);

      const sp500 = await sp500Res.json();
      const nasdaq = await nasdaqRes.json();

      setSP500Data({ close: sp500.c });
      setNasdaqData({ close: nasdaq.c });
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
                <th>
                  {sp500Data?.close != null
                    ? `$${sp500Data.close.toFixed(2)}`
                    : "Loading..."}
                </th>
                <th>NASDAQ</th>
                <th>
                  {nasdaqData?.close != null
                    ? `$${nasdaqData.close.toFixed(2)}`
                    : "Loading..."}
                </th>
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
                    {data.percentageChange !== null ? (
                      <span style={{ background: data.percentageChange >= 0 ? "green" : "red", color: "white", padding: "0 5px", borderRadius: "5px" }}>
                        {data.percentageChange}%
                      </span>
                    ) : (
                      <span style={{ color: "gray" }}>N/A</span>
                    )}
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
