import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../styles/layout.css"; // CSS file we'll create below

export default function Layout() {
	return (
		<div className="layout-wrapper">
			<div className="background-overlay">
				<div className="center-content">
					<h1 className="main-title"> Welcome to Farms2Basket</h1>
					<p className="sub-title">Your one-stop solution for farm-to-market shopping</p>
					<div className="auth-buttons">
						<Link to="/login" className="button">Login</Link>
						<Link to="/register" className="button">Register</Link>
					</div>
				</div>
			</div>
			<Outlet />
		</div>
	);
}
