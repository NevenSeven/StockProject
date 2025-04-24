import React from 'react';
import MarketOveriew from '../pages/tradeview/MarketOveriew.jsx'
import Stockdata from '../components/Stockdata'

const Watchlist = () => {
    return (
      <>
        <div className="container">
          <h1>Your Watchlist Here</h1>
          {/* Watchlist page content */}
          <MarketOveriew/>
        </div>
      </>
    );
  };

  export default Watchlist;