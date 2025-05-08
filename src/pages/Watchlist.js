import React, { useState, useEffect } from 'react';
import MarketOverview from './tradeview/MarketOverview';
import SearchBar from '../components/SearchBar';

const Watchlist = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [tickersList, setTickersList] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState("NASDAQ:AAPL"); // default


  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('watchlist');
    if (saved) {
      setWatchlist(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    const fetchTickers = async () => {
      try {
        const response = await fetch("/tickers.txt");
        const text = await response.text();
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

  const handleSearchChange = (e) => {
    const value = e.target.value.toUpperCase();
    setSearchTerm(value);

    if (!value) {
      setSuggestions([]);
      return;
    }

    const filtered = tickersList
      .filter(t => t.startsWith(value))
      .slice(0, 7);
    setSuggestions(filtered);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (searchTerm) {
      setSelectedSymbol(searchTerm);
      setSuggestions([]);
    }
  };

  const handleSelectTicker = (ticker) => {
    setSelectedSymbol(ticker);
    setSearchTerm("");
    setSuggestions([]);
  };

  return (
    <div className="container">
      <h1>Your Watchlist Here</h1>

      <SearchBar
        searchTerm={searchTerm}
        suggestions={suggestions}
        handleSearchChange={handleSearchChange}
        handleKeyDown={handleKeyDown}
        handleSubmit={handleSubmit}
        handleSelectTicker={handleSelectTicker}
      />
      <ul className="list-group mt-4">
        {watchlist.length === 0 ? (
          <li className="list-group-item">No pinned stocks yet.</li>
        ) : (
          watchlist.map((ticker, idx) => (
            <li key={idx} className="list-group-item">
              {ticker}
            </li>
          ))
        )}
      </ul>

      <MarketOverview symbol={selectedSymbol} />
    </div>
  );
};

export default Watchlist;
