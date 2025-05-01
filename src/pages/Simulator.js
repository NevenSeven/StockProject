import React from 'react';
import StockSimulator from '../components/StockSimulator';

const Simulator = () => {
    return (
      <>
        <div className="container">
          <h1 className="my-4">Simulator</h1>
          <StockSimulator />
        </div>
      </>
    );
  };

export default Simulator;