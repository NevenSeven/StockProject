import React, { useState } from "react";

const stockData = [
  { symbol: "AAPL", name: "Apple Inc.", price: 180.27 },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 140.54 },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 310.25 },
];

const StockSimulator = () => {
  const [portfolio, setPortfolio] = useState({});
  const [selectedStock, setSelectedStock] = useState(stockData[0].symbol);
  const [amount, setAmount] = useState(0);

  const handleBuy = () => {
    const stock = stockData.find(s => s.symbol === selectedStock);
    if (!stock) return;

    const shares = Number(amount) / stock.price;
    setPortfolio(prev => ({
      ...prev,
      [selectedStock]: (prev[selectedStock] || 0) + shares,
    }));
    setAmount(0);
  };

  return (
    <div className="container my-4">
      <h2 className="mb-3">Stock Market Simulator</h2>

      <div className="card p-3 mb-4">
        <div className="mb-2">
          <label>Select a stock:</label>
          <select
            className="form-select"
            value={selectedStock}
            onChange={e => setSelectedStock(e.target.value)}
          >
            {stockData.map(stock => (
              <option key={stock.symbol} value={stock.symbol}>
                {stock.name} ({stock.symbol}) - ${stock.price.toFixed(2)}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-2">
          <input
            type="number"
            className="form-control"
            placeholder="Amount in USD"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </div>

        <button className="btn btn-primary" onClick={handleBuy}>Buy</button>
      </div>

      <div className="card p-3">
        <h4>Your Portfolio</h4>
        {Object.keys(portfolio).length === 0 ? (
          <p>You don't own any shares yet.</p>
        ) : (
          <ul className="list-group">
            {Object.entries(portfolio).map(([symbol, shares]) => {
              const stock = stockData.find(s => s.symbol === symbol);
              return (
                <li className="list-group-item" key={symbol}>
                  {stock.name} ({symbol}): {shares.toFixed(4)} shares = $
                  {(shares * stock.price).toFixed(2)}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default StockSimulator;
