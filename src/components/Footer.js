import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
      <div className="container">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
        <Link className="nav-link px-2 text-muted" to="/">
          <img src="/imgs/logo.svg" width="40" height="40" style={{borderRadius: '10px'}}></img>
        </Link>
          <span className="text-muted">&copy; 2025 Stockstalker, Inc</span>
        </div>
        <ul class="nav col-md-4 justify-content-end">
          <li class="nav-item"><Link className="nav-link px-2 text-muted" to="/">Home</Link></li>
          <li class="nav-item"><Link className="nav-link px-2 text-muted" to="/contact">Contact</Link></li>
          <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Features</a></li>
          <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">FAQs</a></li>
          <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">About</a></li>
        </ul>
      </footer>
    </div>
    );
}

export default Footer;