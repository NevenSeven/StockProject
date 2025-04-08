// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src="/imgs/logo_alt.png" alt="StockStalker" width="225px" />
        </Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/watchlist">Watchlist</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/infostock">Learn About Stocks</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/otherstocks">Other Stocks</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/simulator">Simulator</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
