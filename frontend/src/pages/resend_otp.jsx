import React, { useState } from 'react';
import axios from 'axios';

export default function ResendOtp() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/resend-otp/', { email });
      setMessage("OTP has been sent to your email.");
    } catch (error) {
      setMessage("Failed to send OTP. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h3><strong>Resend OTP</strong></h3>

        <div style={styles.field}>
          <label>Email Address</label>
          <input
            type="email"
            name="otp_email"
            className="form-control"
            placeholder="Enter email-address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <button type="submit" className="btn btn-primary" style={styles.button}>
          Send OTP
        </button>
        {message && <p style={styles.message}>{message}</p>}
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '50px',
  },
  form: {
    width: '500px',
    padding: '20px',
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
    borderRadius: '10px',
  },
  field: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginTop: '5px',
  },
  button: {
    width: '100%',
    marginTop: '10px',
  },
  message: {
    textAlign: 'center',
    marginTop: '15px',
    color: 'green',
  },
};
