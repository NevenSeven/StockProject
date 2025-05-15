import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

import { Outlet } from 'react-router';

const Layout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-fill">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;