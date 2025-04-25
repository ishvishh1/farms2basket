// src/components/Sidebar.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { role, logout } = useAuth();

  const handleLogout = () => {
    localStorage.clear(); // remove tokens and rememberMe
    logout();
    navigate('/login', { state: { message: "Logged out successfully." } });
  };

  const isActive = (path) => location.pathname.includes(path);

  const commonLinks = [
    { path: '/dashboard', label: 'Home' },
    { path: '/profile', label: 'Profile' },
    { path: '/contactus', label: 'Contact Us' }
   ];

  const customerLinks = [
    { path: '/shop', label: 'Shop' },
    { path: '/cart', label: 'My Cart' }, 
    { path: '/order-history', label: 'Order History' },
    { path: '/chat', label: 'Chat' },
    { path: '/delivery-tracking', label: 'Track My Delivery' },
    { path: '/payments', label: 'Payment' },

  ];

  const farmerLinks = [
    { path: '/manage-products', label: 'Manage Products' },
    { path: '/orders', label: 'Orders' },
    { path: '/deliveries', label: 'Deliveries' },
    { path: '/chat', label: 'Chat' },
    { path: '/payments', label: 'Payment' },
  ];

  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        {commonLinks.map(({ path, label }) => (
          <li key={path} className="sidebar-item">
            <Link to={path} className={`sidebar-link ${isActive(path) ? 'active' : ''}`}>
              {label}
            </Link>
          </li>
        ))}

        {role === "customer"
          ? customerLinks.map(({ path, label }) => (
              <li key={path} className="sidebar-item">
                <Link to={path} className={`sidebar-link ${isActive(path) ? 'active' : ''}`}>
                  {label}
                </Link>
              </li>
            ))
          : role === "farmer"
          ? farmerLinks.map(({ path, label }) => (
              <li key={path} className="sidebar-item">
                <Link to={path} className={`sidebar-link ${isActive(path) ? 'active' : ''}`}>
                  {label}
                </Link>
              </li>
            ))
          : null}

        <li className="sidebar-item">
          <button onClick={handleLogout} className="sidebar-link">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
