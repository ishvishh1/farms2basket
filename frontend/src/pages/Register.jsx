import React, { useState } from "react";
import axios from "axios";
import "../assets/styles/register.css";

import { Link, useNavigate } from "react-router-dom";

export default function Register() {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password1: "",
		password2: "",
	});


	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};
	const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null)

	const navigate = useNavigate();
    const handleSubmit = async (e) => {
		e.preventDefault();
        if(isLoading){
            return
        }

        setIsLoading(true);

        try{
            const response = await axios.post("http://127.0.0.1:8000/api/register/", formData)
            console.log("Success!", response.data)
            setSuccessMessage("Registration successful! Please verify your email with the OTP.");

		// Redirect to verify email page
		if (formData.username) {
         setTimeout(() => {
          navigate(`/verify-email/${formData.username}`);
        }, 1500);
} else {
  setError("Username is required");
}
//    // Redirect to login page after 1.5 seconds
//    setTimeout(() => {
// 	navigate("/login");
// }, 1500);}
// Redirect to verify email page

 } catch(error){
            console.log("Error during registration!", error.response?.data);
            if(error.response && error.response.data){
                Object.keys(error.response.data).forEach(field => {
                    const errorMessages = error.response.data[field];
                    if(errorMessages && errorMessages.length > 0){
                        setError(errorMessages[0]);
                    }
                });
            }
        }
        finally{
            setIsLoading(false);
        }

	};
	return (
		<div>
			<div className="register-container">
			<div className="register-content">
            {error && <p style={{color:"red"}}>{error}</p>}
            { successMessage && <p style={{color:"green"}}>{successMessage}</p>}
			<h2>Farms2Basket</h2>
      <h3>"Connecting Farmers with the future of Agriculture"</h3>
      <form>
			
				<br />
				<input
					type="text"
					name="username"
					placeholder="Username"
					value={formData.username}
					onChange={handleChange}
				></input>{" "}
				<br />
			
			
				
				<input
					type="email"
					name="email"
						placeholder="Email"
					value={formData.email}
					onChange={handleChange}
				></input>{" "}
				<br />
				
				<input
					type="password"
					name="password1"
					placeholder="Password"
					value={formData.password1}
					onChange={handleChange}
				></input>{" "}
				<br />
				
	
				<input
					type="password"
					name="password2"
					placeholder="Confirm password"
					value={formData.password2}
					onChange={handleChange}
				></input>{" "}
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
   
				<button type="submit" disabled={isLoading} onClick={handleSubmit}>
					Register
				</button>
				<p className="login-link">
  Already have an account? <Link to="/login">Login here</Link>
</p>


			</form>
		</div>
		</div>
		</div>
	);
}