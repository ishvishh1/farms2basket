import React, { useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

export default function VerifyEmail() {
  const { username } = useParams();
  const [otpCode, setOtpCode] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/verify-email/${username}/`, {
        otp_code: otpCode,
      });

      setMessage(response.data.message || "Account verified successfully!");
      setTimeout(() => navigate("/login"), 3000); // redirect after 3s
    } catch (error) {
      setMessage(error.response?.data?.error || "Invalid or expired OTP");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleVerify} style={styles.form}>
        <h3><strong>Verify Email</strong></h3>
        <div style={styles.field}>
          <label className="form-label">OTP</label>
          <input
            className="form-control"
            name="otp_code"
            placeholder="Enter OTP"
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <button className="btn btn-primary" style={styles.button}>Activate Account</button>
        <p style={{ textAlign: "center" }}>
          Need a new OTP? <Link to="/resend-otp">Resend OTP</Link>
        </p>
        {message && <p style={{ textAlign: "center", marginTop: "10px" }}>{message}</p>}
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
  }
};
