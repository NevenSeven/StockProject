import React from 'react';
import Stockdata from '../components/Stockdata';
import TradingViewWidget from './tradeview/TradingViewWidget';


const Home = () => {
  return(
  <>
    <Stockdata />
    <TradingViewWidget/>
  </>
  );
};

export default Home;
