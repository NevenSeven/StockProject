import React, { useEffect, useState } from "react";

const LOCAL_STORAGE_KEYS = {
  portfolio: "stockSimPortfolio",
  wallet: "stockSimWallet",
};

const StockSimulator = () => {
  const [tickersList, setTickersList] = useState([]); // <-- pulled from /tickers.txt
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedStock, setSelectedStock] = useState("AAPL");
  const [stockPrice, setStockPrice] = useState(null);

  const [amount, setAmount] = useState("");
  const [portfolio, setPortfolio] = useState({});
  const [prices, setPrices] = useState({});
  const [wallet, setWallet] = useState(10000);

  useEffect(() => {
    const savedPortfolio = localStorage.getItem(LOCAL_STORAGE_KEYS.portfolio);
    const savedWallet = localStorage.getItem(LOCAL_STORAGE_KEYS.wallet);

    if (savedPortfolio) setPortfolio(JSON.parse(savedPortfolio));
    if (savedWallet) setWallet(parseFloat(savedWallet));
  }, []);

  useEffect(() => {
      localStorage.setItem(LOCAL_STORAGE_KEYS.portfolio, JSON.stringify(portfolio));
    }, [portfolio]);

    useEffect(() => {
      localStorage.setItem(LOCAL_STORAGE_KEYS.wallet, wallet.toString());
    }, [wallet]);

  // ✅ Fetch ticker list from public/tickers.txt
  useEffect(() => {
    const fetchTickers = async () => {
      try {
        const response = await fetch("/tickers.txt");
        const text = await response.text();
        const tickers = text
          .split("\n")
          .map(t => t.trim())
          .filter(Boolean)
          .map(t => ({ symbol: t, name: t })); // Just show symbol for now

        setTickersList(tickers);
      } catch (err) {
        console.error("Failed to fetch tickers list:", err);
      }
    };

    fetchTickers();
  }, []);

  // ✅ Fetch live stock data
  useEffect(() => {
  const fetchLiveData = async () => {
    try {
      const res = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${selectedStock}&token=d0nnks9r01qn5ghksi8gd0nnks9r01qn5ghksi90`
      );
      const json = await res.json();
      setPrices(prev => ({
        ...prev,
        [selectedStock]: json.c,
      }));
    } catch (err) {
      console.error("Error fetching live price:", err);
    }
  };

  if (selectedStock) fetchLiveData();
}, [selectedStock]);

useEffect(() => {
  const fetchAllPrices = async () => {
    const symbols = Object.keys(portfolio);

    const updatedPrices = { ...prices };

    await Promise.all(
      symbols.map(async (symbol) => {
        if (prices[symbol] != null) return; // skip if already fetched

        try {
          const res = await fetch(
            `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=d0nnks9r01qn5ghksi8gd0nnks9r01qn5ghksi90`
          );
          const json = await res.json();
          updatedPrices[symbol] = json.c;
        } catch (err) {
          console.error(`Failed to fetch price for ${symbol}:`, err);
        }
      })
    );

    setPrices(updatedPrices);
  };

  if (Object.keys(portfolio).length > 0) {
    fetchAllPrices();
  }
}, [portfolio]);



  // ✅ Handle search/filter
  const handleSearchChange = (e) => {
    const value = e.target.value.toUpperCase();
    setSearchTerm(value);
    if (!value) return setSuggestions([]);

    const filtered = tickersList.filter(
      stock =>
        stock.symbol.startsWith(value) || stock.name.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(filtered.slice(0, 7));
  };

  const handleSelect = (symbol) => {
    setSelectedStock(symbol);
    setSearchTerm("");
    setSuggestions([]);
  };

  const handleBuy = () => {
    const price = prices[selectedStock];
    const totalCost = Number(amount);
  
    if (!price || isNaN(amount) || totalCost <= 0 || totalCost > wallet) return;
  
    const shares = totalCost / price;
  
    setPortfolio(prev => ({
      ...prev,
      [selectedStock]: (prev[selectedStock] || 0) + shares,
    }));
  
    setWallet(prev => prev - totalCost);
    setAmount("");
  };

  const handleSell = () => {
    const price = prices[selectedStock];
    const totalSell = Number(amount);
  
    if (!price || isNaN(amount) || totalSell <= 0) return;
  
    const sharesToSell = totalSell / price;
    const ownedShares = portfolio[selectedStock] || 0;
  
    if (sharesToSell > ownedShares) return; // Cannot sell more than you own
  
    setPortfolio(prev => {
      const newShares = ownedShares - sharesToSell;
      const updated = { ...prev };
      if (newShares <= 0) delete updated[selectedStock];
      else updated[selectedStock] = newShares;
      return updated;
    });
  
    setWallet(prev => prev + totalSell);
    setAmount("");
  };

  const handleReset = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.portfolio);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.wallet);
    setPortfolio({});
    setWallet(10000);
  };
  
  

  return (
    <div className="container my-4">
      <h2>Stock Market Simulator</h2>

      {/* ✅ Search Bar */}
      <div className="mb-3 position-relative">
        <input
          className="form-control"
          type="text"
          placeholder="Search ticker..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {suggestions.length > 0 && (
          <ul className="list-group position-absolute mt-1 w-100 z-3">
            {suggestions.map(stock => (
              <li
                key={stock.symbol}
                className="list-group-item list-group-item-action"
                onClick={() => handleSelect(stock.symbol)}
                style={{ cursor: "pointer" }}
              >
                {stock.symbol}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ✅ Selected Stock Info */}
      <div className="mb-3">
        <strong>Selected:</strong> {selectedStock} <br />
        {prices[selectedStock] !== undefined ? (
            <span>Current Price: <strong>${prices[selectedStock].toFixed(2)}</strong></span>
        ) : (
            <span>Loading price...</span>
        )}
        </div>


      {/* ✅ Buy Section */}
      <div className="mb-3">
        <input
          className="form-control"
          type="number"
          placeholder="Amount in USD"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
      </div>
      <button className="btn btn-primary mb-4" onClick={handleBuy}>
        Buy
      </button>
      <button className="btn btn-danger mb-4 ms-2" onClick={handleSell}>
        Sell
    </button>

      <div className="alert alert-info">
        <strong>Wallet Balance:</strong> ${wallet.toFixed(2)}
    </div>

      {/* ✅ Portfolio */}
      <div className="card p-3">
        <h4>Your Portfolio</h4>
        {Object.keys(portfolio).length === 0 ? (
            <p>You don't own any shares yet.</p>
        ) : (
            <ul className="list-group">
            {Object.entries(portfolio).map(([symbol, shares]) => (
                <li className="list-group-item" key={symbol}>
                {symbol}: {shares.toFixed(4)} shares = $
                {prices[symbol]
                    ? (shares * prices[symbol]).toFixed(2)
                    : "Fetching..."}
                </li>
            ))}
            </ul>
        )}
        </div>
          {/* Reset Button */}
          <button className="btn btn-warning mt-3" onClick={handleReset}>
            Reset Simulator
        </button>
    </div>
  );
};

export default StockSimulator;
