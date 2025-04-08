// api/stock.js

import fetch from 'node-fetch';  // Change to import
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const apiKey = "55507a823c51d7bef567c5def36ae150da260b3a";

// ✅ Read tickers from text file (same as in server.js)
const tickersPath = path.join(__dirname, '../tickers.txt');
const stockTickers = fs.readFileSync(tickersPath, "utf-8")
  .split("\n")
  .map(t => t.trim())
  .filter(t => t.length > 0);

// Set up CORS
const corsMiddleware = cors();

// Wrapper to handle serverless function response
function handleCors(req, res, next) {
  corsMiddleware(req, res, next);
}

// API Endpoint to get all tickers
export default async function handler(req, res) {
  handleCors(req, res, async () => {
    const { method } = req;
    if (method === "GET" && req.query.ticker) {
      const ticker = req.query.ticker;
      try {
        // Endpoint to get stock data for a specific ticker
        const apiUrl = `https://api.tiingo.com/tiingo/daily/${ticker}/prices?token=${apiKey}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("API response error:", errorText);
          return res.status(500).json({ error: `Failed to fetch stock data: ${response.status} ${response.statusText}` });
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
          high: data[0]?.high,
          low: data[0]?.low,
          volume: data[0]?.volume,
          percentageChange: percentageChange.toFixed(2),
        };

        res.status(200).json(stockData);
      } catch (error) {
        console.error("Backend error:", error);
        res.status(500).json({ error: error.message });
      }
    } else if (method === "GET" && !req.query.ticker) {
      // Optional: Return all stock tickers if no ticker is provided
      res.status(200).json({ tickers: stockTickers });
    } else {
      res.status(405).json({ error: `Method ${method} Not Allowed` });
    }
  });
}
