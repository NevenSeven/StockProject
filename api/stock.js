export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const { method, query } = req;
  const ticker = query.ticker;
  const apiKey = "55507a823c51d7bef567c5def36ae150da260b3a";

  if (method !== 'GET') {
    return res.status(405).json({ error: `Method ${method} Not Allowed` });
  }

  // 🟢 Handle request with no ticker: return tickers list
  if (!ticker) {
    try {
      const baseURL = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000"; // local fallback

      const response = await fetch(`${baseURL}/tickers.txt`);
      const text = await response.text();
      const tickers = text.split('\n').map(t => t.trim()).filter(Boolean);

      return res.status(200).json({ tickers });
    } catch (err) {
      return res.status(500).json({ error: "Failed to load tickers.txt" });
    }
  }

  // 🟢 Handle request with ticker: fetch stock data
  try {
    if (!apiKey) {
      return res.status(400).json({ error: "Missing TIINGO_API_KEY" });
    }

    const apiUrl = `https://api.tiingo.com/tiingo/daily/${ticker}/prices?token=${apiKey}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(500).json({ error: `Tiingo API error: ${errorText}` });
    }

    const data = await response.json();
    const openPrice = data[0]?.open;
    const closePrice = data[0]?.close;
    const percentageChange = ((closePrice - openPrice) / openPrice) * 100;

    const stockData = {
      ticker,
      date: data[0]?.date,
      open: openPrice,
      close: closePrice,
      high: data[0]?.high,
      low: data[0]?.low,
      volume: data[0]?.volume,
      percentageChange: percentageChange.toFixed(2),
    };

    return res.status(200).json(stockData);
  } catch (error) {
    console.error('Backend error:', error);
    return res.status(500).json({ error: error.message });
  }
}
