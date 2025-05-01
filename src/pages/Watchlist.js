import React, { useState, useEffect } from 'react';
import MarketOveriew from '../pages/tradeview/MarketOveriew.jsx';
import SearchBar from '../components/SearchBar';

const Watchlist = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [tickersList, setTickersList] = useState([]);

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
    if (suggestions.length > 0) {
      alert(`You selected: ${suggestions[0]}`);
    } else if (searchTerm) {
      alert(`You searched for: ${searchTerm}`);
    }
  };

  const handleSelectTicker = (ticker) => {
    alert(`You selected: ${ticker}`);
    setSearchTerm("");
    setSuggestions([]);
  };

  return (
    <div className="container">
      <h1>Your Watchlist Here</h1>

      {/* SearchBar */}
      <SearchBar
        searchTerm={searchTerm}
        suggestions={suggestions}
        handleSearchChange={handleSearchChange}
        handleKeyDown={handleKeyDown}
        handleSubmit={handleSubmit}
        handleSelectTicker={handleSelectTicker}
      />

      {/* Watchlist page content */}
      <MarketOveriew />
    </div>
  );
};

export default Watchlist;
