// ManageProducts.jsx
import React, { useState } from 'react';

const ManageProducts = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Tomatoes', price: 20 },
    { id: 2, name: 'Apples', price: 30 },
  ]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price) {
      setProducts([
        ...products,
        { id: products.length + 1, ...newProduct },
      ]);
      setNewProduct({ name: '', price: '' });
    }
  };

  return (
    <div className="manage-products">
      <h2>Manage Your Products</h2>
      <div>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Product Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageProducts;
