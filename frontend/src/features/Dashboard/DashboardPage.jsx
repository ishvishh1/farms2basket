import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomerDashboard from "../Customer/CustomerDashboard";
import FarmerDashboard from "../Farmer/FarmerDashboard";

const DashboardPage = ({ role }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          setIsLoggedIn(false);
          navigate("/login");
          return;
        }

        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };

        const response = await axios.get("http://127.0.0.1:8000/api/user/", config);
        if (response.data.username) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          navigate("/login");
        }
      } catch (error) {
        console.error("Authentication failed:", error.response?.data || error.message);
        setIsLoggedIn(false);
        navigate("/login");
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (isChecking) {
    return <h2 className="home-container">Loading dashboard...</h2>;
  } 
  console.log("DashboardPage role:", role);


  return isLoggedIn ? (
    role === "customer" ? <CustomerDashboard role="customer" /> :
    role === "farmer" ? <FarmerDashboard role="farmer" /> :
    <h2>Unknown role</h2>
  ) : (
    <h2>Please login</h2>
  );
};

export default DashboardPage;
