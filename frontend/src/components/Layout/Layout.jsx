// src/layouts/Layout.js

import React from 'react';
import Sidebar from '../Sidebar/Sidebar'; // Import Sidebar
import { Outlet } from 'react-router-dom'; // The Outlet is used to render child routes

const Layout = ({ role }) => {
  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar on the left */}
      <Sidebar role={role} />
      
      {/* Main Content on the right */}
      <div style={{ flex: 1, marginLeft: '260px', padding: '20px' }}>
        <Outlet /> {/* This will render the active page */}
      </div>
    </div>
  );
};

export default Layout;
