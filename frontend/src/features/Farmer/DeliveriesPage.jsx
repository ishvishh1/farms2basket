// DeliveriesPage.jsx
import React, { useState, useEffect } from 'react';

const DeliveriesPage = () => {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    // Fetch deliveries from API or mock data
    const fetchedDeliveries = [
      { id: 1, product: 'Tomatoes', status: 'Pending' },
      { id: 2, product: 'Apples', status: 'Delivered' },
    ];
    setDeliveries(fetchedDeliveries);
  }, []);

  return (
    <div className="deliveries-page">
      <h2>Deliveries</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map((delivery) => (
            <tr key={delivery.id}>
              <td>{delivery.product}</td>
              <td>{delivery.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeliveriesPage;
