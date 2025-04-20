import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/login.css";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'; // Import useLocation
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
    rememberMe: false,  // New state for remember me checkbox
  });

  const navigate = useNavigate();

  // Get the message passed via state when the user is redirected
  const location = useLocation();
  const [message, setMessage] = useState(location.state?.message || ""); // Default to empty string if no message

  useEffect(() => {
    // If there's a message, display it for 5 seconds
    if (message) {
      const timer = setTimeout(() => {
        setMessage(""); // Clear the message after 5 seconds
      }, 5000);

      // Clean up the timer if the component is unmounted
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      rememberMe: e.target.checked,  // Update the rememberMe state based on checkbox
    });
  };

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", formData);
      console.log("Success!", response.data);
      setSuccessMessage("Login Successful!");

      localStorage.setItem("accessToken", response.data.tokens.access);
      localStorage.setItem("refreshToken", response.data.tokens.refresh);

      // Set the remember me functionality
      if (formData.rememberMe) {
        localStorage.setItem("rememberMe", true);
      }

      // Redirect to home page
      navigate("/home");

    } catch (error) {
      console.log("Error during Login!", error.response?.data);
      if (error.response && error.response.data) {
        Object.keys(error.response.data).forEach((field) => {
          const errorMessages = error.response.data[field];
          if (errorMessages && errorMessages.length > 0) {
            setError(errorMessages[0]);
          }
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div>
          {/* Display the "Please log in" message if available for 5 seconds */}
          {message && <p style={{ color: "red" }}>{message}</p>}
          
          {error && <p style={{ color: "red" }}>{error}</p>}
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

          <h2>Farms2Basket</h2>
          <h3>"Connecting Farmers with the future of Agriculture"</h3>
          <br /> 
          <form>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <br />
            <br />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <br />
            <br />
            {/* Role Selection */}
            <div className="role-selection">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="customer"
                  checked={formData.role === "customer"}
                  onChange={handleChange}
                />
                Customer
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="farmer"
                  checked={formData.role === "farmer"}
                  onChange={handleChange}
                />
                Farmer
              </label>
            </div>
            <br />

            {/* Remember Me Checkbox */}
            <div className="remember-me">
              <label>
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleCheckboxChange}
                />
                Remember Me   
                {/* Forgot Password Link */} 
                <Link to="/forgot-password">Forgot Password?</Link>
              </label>
              
            </div>
            <br />
            <button type="submit" disabled={isLoading} onClick={handleSubmit}>
              Login
            </button>
          </form>
          <br />

          {/* Register Link for users without an account */}
          {!error && (
            <p className="register-link">
              Don't have an account? <Link to="/register">Register here</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
