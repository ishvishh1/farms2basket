// OrdersPage.jsx
import React, { useState, useEffect } from 'react';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from API or mock data
    const fetchedOrders = [
      { id: 1, customer: 'John Doe', product: 'Tomatoes', status: 'Pending' },
      { id: 2, customer: 'Jane Smith', product: 'Apples', status: 'Completed' },
    ];
    setOrders(fetchedOrders);
  }, []);

  const handleCompleteOrder = (id) => {
    setOrders(orders.map(order => order.id === id ? { ...order, status: 'Completed' } : order));
  };

  return (
    <div className="orders-page">
      <h2>Your Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Product</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.customer}</td>
              <td>{order.product}</td>
              <td>{order.status}</td>
              <td>
                {order.status === 'Pending' && (
                  <button onClick={() => handleCompleteOrder(order.id)}>Mark as Completed</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
