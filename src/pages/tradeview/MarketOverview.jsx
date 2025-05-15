import React from 'react';
import { useEffect, useRef, useState } from 'react';

export default function MarketOverview() {
  const containerRef = useRef(null);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('watchlist');
    if (saved) {
      setWatchlist(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear existing content
    containerRef.current.innerHTML = '';

    // Create a widget for each stock
    watchlist.forEach(symbol => {
      const div = document.createElement('div');
      div.className = 'tradingview-widget-container';
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js';
      script.async = true;
      script.innerHTML = JSON.stringify({
        symbol: `NASDAQ:${symbol}`,
        width: "100%",
        colorTheme: "dark",
        isTransparent: false,
        locale: "en"
      });
      div.appendChild(script);
      containerRef.current.appendChild(div);
    });
  }, [watchlist]);

  return <div ref={containerRef}></div>;
}
