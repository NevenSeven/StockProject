import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import Watchlist from './pages/Watchlist';
import Simulator from './pages/Simulator';
import Info from './pages/Info';
import Other from './pages/Other';
import Stockdata from './components/Stockdata';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="watchlist" element={<Watchlist />} />
          <Route path="infostock" element={<Info />} />
          <Route path="otherstocks" element={<Other />} />
          <Route path="simulator" element={<Simulator />} />
          <Route path="app/stock" element={<Stockdata />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;