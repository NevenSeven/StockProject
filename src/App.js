import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import Watchlist from './pages/Watchlist';
import Simulator from './pages/Simulator';
import Info from './pages/Info';
import Crypto from './pages/Crypto';
import Contact from './pages/Contact';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="watchlist" element={<Watchlist />} />
        <Route path="infostock" element={<Info />} />
        <Route path="crypto" element={<Crypto />} />
        <Route path="simulator" element={<Simulator />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default App;
