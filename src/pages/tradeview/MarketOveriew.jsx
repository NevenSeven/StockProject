import { useEffect, useRef } from 'react';

export default function MarketOverview({ symbol }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "symbol": symbol || "NASDAQ:AAPL",
      "width": "100%",
      "colorTheme": "dark",
      "isTransparent": false,
      "locale": "en"
    });

    if (containerRef.current) {
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(script);
    }
  }, [symbol]);

  return <div className="tradingview-widget-container" ref={containerRef}></div>;
}
