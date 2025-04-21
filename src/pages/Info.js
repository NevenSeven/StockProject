import React from 'react';

const Info = () => {
  return (
    <div className="container my-5">
      <div id="history" className="mb-4">
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h2 className="card-title">Origins of Stock</h2>
                <p className="card-text">The concept of stocks dates back to the early 17th century. The first modern stock market, the Amsterdam Stock Exchange, was established in 1602 by the Dutch East India Company. This allowed people to buy and sell shares of the company, marking the beginning of stock trading.</p>
              </div>
            </div>
          </div>
          
          <div className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h2 className="card-title">The First Stock</h2>
                <p className="card-text">The concept of stocks dates back to the early 17th century. The first modern stock market, the Amsterdam Stock Exchange, was established in 1602 by the Dutch East India Company. This allowed people to buy and sell shares of the company, marking the beginning of stock trading.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">How People Bought and Traded Stock in the Past</h2>
              <p className='card-text'>Before modern technology, stock trading was done manually. Traders gathered on trading floors, using hand signals and shouting orders. The NYSE was founded in 1792 when 24 stockbrokers signed the Buttonwood Agreement.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">How People Buy and Trade Stocks Now</h2>
              <p className='card-text'>Most people use online brokerage accounts or apps to trade stocks. These platforms offer easy-to-use interfaces.</p><br>
              <h3 className="mt-3">Best Apps for Stock Trading</h3>
              <ul className="list-group list-group-flush">
                <li className="list-group-item"><strong>Robinhood</strong> – Commission-free, beginner-friendly.</li>
                <li className="list-group-item"><strong>Webull</strong> – Advanced charting tools.</li>
                <li className="list-group-item"><strong>TD Ameritrade</strong> – Comprehensive research tools.</li>
                <li className="list-group-item"><strong>Fidelity</strong> – Low-cost trades, strong research.</li>
                <li className="list-group-item"><strong>Charles Schwab</strong> – Excellent customer service.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Market Opening and Closing Times</h2>
              <p className="card-text">The U.S. stock market (NYSE, NASDAQ) opens at 9:30 AM ET and closes at 4:00 PM ET, Monday to Friday.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Most Valuable Stock</h2>
              <p className="card-text">The most valuable stock by share price is <strong>Berkshire Hathaway (BRK.A)</strong>. In terms of market capitalization, companies like Apple and Microsoft lead.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">How Stock Trading Works Today</h2>
              <p className="card-text">Stock prices are determined by supply and demand. Investors use strategies like technical and fundamental analysis to predict price movements.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Stock Market Structure</h2>
              <ul className="list-group list-group-flush">
                <li className="list-group-item"><strong>NYSE</strong>: A physical exchange for large companies.</li>
                <li className="list-group-item"><strong>NASDAQ</strong>: A fully electronic exchange with tech stocks.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Dividends and Stock Splits</h2>
              <ul className="list-group list-group-flush">
                <li className="list-group-item"><strong>Dividends:</strong> Many companies pay out profits to shareholders quarterly.</li>
                <li className="list-group-item"><strong>Stock Splits:</strong> Companies split stocks when prices get too high.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col">
          <div className="card bg-light">
            <div className="card-body">
              <h2 className="card-title">Conclusion</h2>
              <p className="card-text">The stock market has evolved significantly, allowing anyone to participate through digital platforms.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
