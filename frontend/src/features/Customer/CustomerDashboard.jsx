import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import DashboardContent from "../../components/DashboardContent/DashboardContent";
import './CustomerDashboard.css';

const CustomerDashboard = ({ role }) => {
  return (
    <div className="dashboard-container">
      <Sidebar role={role} />
      <div className="dashboard-content"> 
        <DashboardContent role={role} />
        <Outlet />
      </div>
    </div>
  );
};

export default CustomerDashboard;
