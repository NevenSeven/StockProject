const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); // Enable CORS for all requests

const apiKey = "55507a823c51d7bef567c5def36ae150da260b3a"; // Replace with your actual API key

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

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));