import React, { useState } from 'react';
import axios from 'axios';
import '../assets/styles/ForgetPassword.css'; // Make sure to import your CSS

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/password-reset/', { email });
      setMessage("Password reset link has been sent to your email.");
    } catch (error) {
      setMessage("Failed to send password reset email.");
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      <p className="message">{message}</p>
    </div>
  );
}
