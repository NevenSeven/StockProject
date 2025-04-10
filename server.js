const express = require("express");
const cors = require("cors");
const fs = require("fs"); // ✅ Add this
const path = require("path"); // ✅ Add this

const app = express();
app.use(cors());

const apiKey = "55507a823c51d7bef567c5def36ae150da260b3a";

// ✅ Read tickers from text file
const tickersPath = path.join(__dirname, "tickers.txt");
const stockTickers = fs.readFileSync(tickersPath, "utf-8")
  .split("\n")
  .map(t => t.trim())
  .filter(t => t.length > 0);

console.log("Loaded stock tickers:", stockTickers);

// Optional: Create an endpoint to send all tickers to the frontend
app.get("/api/tickers", (req, res) => {
  res.json({ tickers: stockTickers });
});


// Existing endpoint to get data for a specific ticker
app.get("/api/stock/:ticker", async (req, res) => {
  const { ticker } = req.params;

  try {
    const apiUrl = `https://api.tiingo.com/tiingo/daily/${ticker}/prices?token=${apiKey}`;
    console.log("Fetching data from:", apiUrl);

    const response = await fetch(apiUrl);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API response error:", errorText);
      throw new Error(`Failed to fetch stock data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    const openPrice = data[0]?.open;
    const closePrice = data[0]?.close;

    const percentageChange = ((closePrice - openPrice) / openPrice) * 100;

    const stockData = {
      ticker: ticker,
      date: data[0]?.date,
      open: openPrice,
      close: closePrice,
      high: data[0].high,
      low: data[0]?.low,
      volume: data[0]?.volume,
      percentageChange: percentageChange.toFixed(2),
    };

    res.json(stockData);
  } catch (error) {
    console.error("Backend error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/stock/:ticker/:date", async (req, res) => {
  const { ticker, date } = req.params;

  try {
    const apiUrl = `https://api.tiingo.com/tiingo/daily/${ticker}/prices?startDate=${date}&endDate=${date}&token=${apiKey}`;
    console.log("Fetching data from:", apiUrl);

    const response = await fetch(apiUrl);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API response error:", errorText);
      throw new Error(`Failed to fetch stock data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.length) {
      return res.status(404).json({ error: `No data found for ${ticker} on ${date}` });
    }

    const openPrice = data[0]?.open;
    const closePrice = data[0]?.close;
    const percentageChange = ((closePrice - openPrice) / openPrice) * 100;

    const stockData = {
      ticker: ticker,
      date: data[0]?.date,
      open: openPrice,
      close: closePrice,
      high: data[0]?.high,
      low: data[0]?.low,
      volume: data[0]?.volume,
      percentageChange: percentageChange.toFixed(2),
    };

    res.json(stockData);
  } catch (error) {
    console.error("Backend error:", error);
    res.status(500).json({ error: error.message });
  }
});



app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
