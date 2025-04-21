import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/styles/login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "", // 👈 user-selected
    rememberMe: false,
  });

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [message, setMessage] = useState(location.state?.message || "");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCheckboxChange = (e) =>
    setFormData({ ...formData, rememberMe: e.target.checked });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    if (!formData.role) {
      setError("Please select a role: Customer or Farmer");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", formData);
      const { tokens } = response.data;

      localStorage.setItem("accessToken", tokens.access);
      localStorage.setItem("refreshToken", tokens.refresh);
      localStorage.setItem("rememberMe", formData.rememberMe);

      login(formData.role); // ✅ Use chosen role
      setSuccessMessage("Login Successful!");

      if (formData.role === "customer") navigate("/customer-dashboard");
      else if (formData.role === "farmer") navigate("/farmer-dashboard");
    } catch (error) {
      const err = error.response?.data;
      const firstError = err ? Object.values(err)[0]?.[0] : "Login failed.";
      setError(firstError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        {message && <p style={{ color: "red" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

        <h2>Farms2Basket</h2>
        <h3>"Connecting Farmers with the Future of Agriculture"</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <br />

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

          <div className="remember-me">
            <label>
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleCheckboxChange}
              />
              Remember Me
            </label>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        {!error && (
          <p className="register-link">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        )}
      </div>
    </div>
  );
}
