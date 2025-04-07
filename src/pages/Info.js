import React from 'react';

const Info = () => {
  return (
    <>
      <div className="container">
        <div id="history">
          <article>
            <h2>Origins of Stock</h2>
            <p>The concept of stocks dates back to the early 17th century...</p>
          </article>

          <article>
            <h2>The First Stock</h2>
            <p>The Dutch East India Company is credited with issuing the first stock...</p>
          </article>
        </div>

        <article>
          <h2>How People Bought and Traded Stock in the Past</h2>
          <p>Before modern technology, stock trading was done manually...</p>
        </article>

        <article>
          <h2>How People Buy and Trade Stocks Now</h2>
          <p>Most people use online brokerage accounts or apps to trade stocks...</p>
          <h3>Best Apps for Stock Trading</h3>
          <ul>
            <li><strong>Robinhood</strong> – Commission-free, beginner-friendly.</li>
            <li><strong>Webull</strong> – Advanced charting tools.</li>
            <li><strong>TD Ameritrade</strong> – Comprehensive research tools.</li>
            <li><strong>Fidelity</strong> – Low-cost trades, strong research.</li>
            <li><strong>Charles Schwab</strong> – Excellent customer service.</li>
          </ul>
        </article>

        <article>
          <h2>Market Opening and Closing Times</h2>
          <p>The U.S. stock market (NYSE, NASDAQ) opens at 9:30 AM ET and closes at 4:00 PM ET, Monday to Friday.</p>
        </article>

        <article>
          <h2>Most Valuable Stock</h2>
          <p>The most valuable stock by share price is <strong>Berkshire Hathaway (BRK.A)</strong>...</p>
        </article>

        <article>
          <h2>How Stock Trading Works Today</h2>
          <p>Stock prices are determined by supply and demand...</p>
        </article>

        <article>
          <h2>Stock Market Structure</h2>
          <ul>
            <li><strong>NYSE</strong>: A physical exchange for large companies.</li>
            <li><strong>NASDAQ</strong>: A fully electronic exchange with tech stocks.</li>
          </ul>
        </article>

        <article>
          <h2>Dividends and Stock Splits</h2>
          <ul>
            <li><strong>Dividends:</strong> Many companies pay out profits to shareholders quarterly.</li>
            <li><strong>Stock Splits:</strong> Companies split stocks when prices get too high.</li>
          </ul>
        </article>

        <article>
          <h2>Conclusion</h2>
          <p>The stock market has evolved significantly, allowing anyone to participate through digital platforms.</p>
        </article>
      </div>
    </>
  );
};

export default Info;
