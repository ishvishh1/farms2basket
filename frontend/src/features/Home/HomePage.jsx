import React from 'react';
import './HomePage.css'; // Import the corresponding CSS file

const HomePage = () => {
  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Welcome to Farm2Basket</h1>
        <p>Your one-stop solution for farm-to-market shopping</p>
      </header>
      
      <section className="home-features">
        <div className="feature-item">
          <h2>Fresh Produce</h2>
          <p>Get fresh fruits and vegetables directly from the farmers.</p>
        </div>
        <div className="feature-item">
          <h2>Local Goods</h2>
          <p>Support local farmers by buying their homemade products.</p>
        </div>
        <div className="feature-item">
          <h2>Fast Delivery</h2>
          <p>Order now and receive your products quickly and reliably.</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
