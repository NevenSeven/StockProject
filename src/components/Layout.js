import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import PopupSpawner from './Popup' 

import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <PopupSpawner />
      <main className="flex-fill">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;