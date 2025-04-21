import React from 'react';
import './OrderList.css';

const OrderList = () => {
  // Mock orders data, ideally would be fetched from an API
  const orders = [
    { id: 1, product: 'Fresh Tomatoes', quantity: 2, status: 'Delivered' },
    { id: 2, product: 'Organic Apples', quantity: 5, status: 'In Transit' },
    { id: 3, product: 'Fresh Carrots', quantity: 3, status: 'Delivered' },
    // Add more orders as needed
  ];

  return (
    <div className="order-list">
      {orders.map((order) => (
        <div key={order.id} className="order-item">
          <h3>Product: {order.product}</h3>
          <p><strong>Quantity:</strong> {order.quantity}</p>
          <p><strong>Status:</strong> {order.status}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
