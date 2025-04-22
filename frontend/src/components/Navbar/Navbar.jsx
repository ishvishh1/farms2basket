import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('accessToken');

  const hideNavOn = [
    "/customer-dashboard",
    "/farmer-dashboard",
    "/dashboard",
    "/profile",
    "/shop",
    "/order-history",
    "/chat",
    "/delivery-tracking",
    "/payments",
    "/manage-products",
    "/orders",
    "/deliveries",
    "/cart",
  ];

  // Hide Navbar if on a dashboard route
  if (hideNavOn.some((path) => location.pathname.startsWith(path))) {
    return null;
  }

  // Hide navbar on private routes if user is not logged in
  const publicPaths = ["/", "/login", "/register"];
  if (!publicPaths.includes(location.pathname) && !isLoggedIn) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Farm2Basket
        </Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/login" className="navbar-link">Login</Link>
          </li>
          <li className="navbar-item">
            <Link to="/register" className="navbar-link">Sign Up</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
