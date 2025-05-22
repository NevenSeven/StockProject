import React, { useEffect, useState } from 'react';
import TradingViewWidget from '../pages/tradeview/TradingViewWidget';

export default function WatchlistCharts() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('watchlist');
    if (saved) {
      setWatchlist(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="container">
      {/* {watchlist.length === 0 ? (
        <p>No stocks pinned to watchlist.</p>
      ) : (
        watchlist.map((ticker, index) => (
          <div key={index} className="mb-4">
            <h4>{ticker}</h4>
            <TradingViewWidget symbol={`NASDAQ:${ticker}`} height="400px" />
          </div>
        ))
      )} */}
    </div>
  );
}
