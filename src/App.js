import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Watchlist from './pages/Watchlist';
import Simulator from './pages/Simulator';
import Info from './pages/Info';
import Other from './pages/Other';

function App() {
  return (
    <Router>
      <Navbar /> {/* stays visible on all pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/infostock" element={<Info />} />
        <Route path="/otherstocks" element={<Other />} />
        <Route path="/simulator" element={<Simulator />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
