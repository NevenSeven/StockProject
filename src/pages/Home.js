import React from 'react';
import Stockdata from '../components/Stockdata';
import Chart from '../components/Chart';

const Home = () => {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(Stockdata),
    React.createElement(Chart)
  );
};

export default Home;
