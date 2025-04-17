export default async function handler(req, res) {
    const apiKey = "55507a823c51d7bef567c5def36ae150da260b3a";
  
    try {
      const sp500Res = await fetch(`https://api.tiingo.com/tiingo/daily/RYSOX/prices?token=${apiKey}`);
      const sp500Data = await sp500Res.json();
  
      const nasdaqRes = await fetch(`https://api.tiingo.com/tiingo/daily/NDAQ/prices?token=${apiKey}`);
      const nasdaqData = await nasdaqRes.json();
  
      res.status(200).json({
        sp500: sp500Data[0],
        nasdaq: nasdaqData[0],
      });
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch index data" });
    }
  }
  