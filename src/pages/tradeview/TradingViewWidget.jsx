import React, { useEffect, useRef, memo } from 'react';

function TradingViewWidget({symbol = "NASDAQ:AAPL"}) {
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
          "allow_symbol_change": true,
          "height": "450px"
        });
      container.current.appendChild(script);
    }, [symbol]);

  return (
    <div className="tradingview-widget-container" ref={container} style={{ height: "450px", width: "100%" }}>
      <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
    </div>
  );
}

export default memo(TradingViewWidget);
