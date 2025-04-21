import React from 'react';
import './ProductList.css';

const ProductList = () => {
  // Mock products data, ideally would be fetched from an API
  const products = [
    { id: 1, name: 'Fresh Tomatoes', price: 150, description: 'Freshly harvested tomatoes from local farms.' },
    { id: 2, name: 'Organic Apples', price: 200, description: 'Juicy and organic apples.' },
    { id: 3, name: 'Fresh Carrots', price: 100, description: 'Crisp and fresh carrots from organic farms.' },
    // Add more products as needed
  ];

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-item">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p><strong>Price:</strong> Rs. {product.price}</p>
          <button className="buy-button">Buy Now</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
