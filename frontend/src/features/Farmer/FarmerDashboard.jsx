import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import DashboardContent from "../../components/DashboardContent/DashboardContent";

const FarmerDashboard = ({ role }) => { // Ensure the role is passed as a prop
  return (
    <div className="farmer-dashboard">
      <Sidebar role={role} /> {/* Pass role to Sidebar */}
      <h2>Farmer Dashboard</h2>
      <p>Manage your products and orders here.</p>
      <div className="dashboard-content">
        <DashboardContent role={role} /> {/* Pass role to DashboardContent */}
      </div>
    </div>
  );
};

export default FarmerDashboard;
