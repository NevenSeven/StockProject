import React, { useEffect, useRef, memo } from 'react';

function TradingViewWidget({symbol = "NASDAQ:AAPL", height = "450px"}) {
  const container = useRef(null);

  useEffect(() => {
      if (container.current) {
        while (container.current.firstChild) {
          container.current.removeChild(container.current.firstChild);
        }

      container.current.innerHTML = "";
      }
      
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.text = JSON.stringify({
          "autosize": true,
          "symbol": symbol,
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "light",
          "style": "1",
          "locale": "en",
          "allow_symbol_change": true
        });
      container.current.appendChild(script);
    }, [symbol]);

  return (
    <div 
      className="tradingview-widget-container" 
      ref={container} 
      style={{
        height: height,
        width: "100%",
        borderRadius: "8px",
        overflow: "hidden",
       }}
      />
  );
}

export default memo(TradingViewWidget);
