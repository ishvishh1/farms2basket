import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext"; // 👈 Wrap the app with context

import HomePage from "../features/Home/HomePage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ResetPassword from "../pages/ResetPassword";
import ForgotPassword from "../pages/ForgotPassword";
import ResendOtp from "../pages/resend_otp";
import VerifyEmail from "../pages/Verify_Email";

import CustomerDashboard from "../features/Customer/CustomerDashboard";
import FarmerDashboard from "../features/Farmer/FarmerDashboard";
import ProfilePage from "../features/Profile/ProfilePage";
import ShopPage from "../features/Customer/ShopPage";
import OrderHistory from "../features/Customer/OrderHistory";
import ChatPage from "../features/Chat/ChatPage";
import DeliveryTracking from "../features/Delivery/DeliveryTracking";
import PaymentsPage from "../features/Payments/PaymentsPage";
import ManageProducts from "../features/Farmer/ManageProducts";
import OrdersPage from "../features/Farmer/OrdersPage";
import DeliveriesPage from "../features/Farmer/DeliveriesPage";

import DashboardPage from "../features/Dashboard/DashboardPage";
import Layout from "../components/Layout/Layout";
import Navbar from "../components/Navbar/Navbar";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />
          <Route path="/verify-email/:username" element={<VerifyEmail />} />
          <Route path="/resend-otp" element={<ResendOtp />} />

          {/* Protected Routes - use Layout which includes Sidebar */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/customer-dashboard" element={<CustomerDashboard />} />
            <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/delivery-tracking" element={<DeliveryTracking />} />
            <Route path="/payments" element={<PaymentsPage />} />
            <Route path="/manage-products" element={<ManageProducts />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/deliveries" element={<DeliveriesPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
