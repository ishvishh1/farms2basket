import React, { useState, useEffect } from 'react';
import axios from "axios";
import "../styles/home.css";
import { useNavigate } from 'react-router-dom'; 
export default function Home() {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isChecking, setIsChecking] = useState(true); // loading state
  const navigate = useNavigate(); // Initialize useNavigate
  useEffect(() => {
    const checkLoggedInUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        console.log("Checking token:", token);

        if (token) {
          const config = {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          };
          const response = await axios.get("http://127.0.0.1:8000/api/user/", config);
          console.log("User data:", response.data);
          
          if (response.data.username) {
            setLoggedIn(true);
            setUsername(response.data.username);
          } else {
            setLoggedIn(false);
            setUsername("");
          }
        } else {
          setLoggedIn(false);
          setUsername("");
        }
      } catch (error) {
        console.error("Error fetching user data:", error.response?.data || error.message);
        setLoggedIn(false);
        setUsername("");
      } finally {
        setIsChecking(false);
      }
    };

    checkLoggedInUser();
  }, []);

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (accessToken && refreshToken) {
        const config = {
          headers: {
            "Authorization": `Bearer ${accessToken}`
          }
        };
        await axios.post("http://127.0.0.1:8000/api/logout/", { "refresh": refreshToken }, config);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setLoggedIn(false);
        setUsername("");
        console.log("Log out successful!");
        // Redirect to the login page after logout
        navigate("/login", { state: { message: "Please log in" } });// Use navigate to go to the login page
      }
    } catch (error) {
      console.error("Failed to logout:", error.response?.data || error.message);
    }
  };

  if (isChecking) {
    return <h2>Checking login status...</h2>; // Loading message
  }

  return (
    <div className="home-container">
      {isLoggedIn ? (
        <>
          <h2>Hi, {username}. Thanks for logging in!</h2>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <h2>You are not logged in.</h2>
      )}
    </div>
  );
}
