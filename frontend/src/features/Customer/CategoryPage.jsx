import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CategoryPage.css';
import { useCart } from '../../context/CartContext'; // ✅ import cart context

// Imported images from the local src folder
import watermelonImg from './categories/watermelon.jpg';
import avocadoImg from './categories/avocado.jpg';
import papayaImg from './categories/papaya.jpg';
import strawberryImg from './categories/strawberry.jpg';
import dragonfruitImg from './categories/dragonfruit.jpg';

const sampleProducts = {
  fruits: [
    { id: 1, name: 'Watermelon', price: 120, image: watermelonImg },
    { id: 2, name: 'Avocado', price: 80, image: avocadoImg },
    { id: 3, name: 'Papaya', price: 80, image: papayaImg },
    { id: 4, name: 'Strawberries', price: 80, image: strawberryImg },
    { id: 5, name: 'Dragon Fruit', price: 80, image: dragonfruitImg },
    { id: 6, name: 'Banana', price: 80, image: watermelonImg },
  ],
  vegetables: [
    { id: 7, name: 'Tomato', price: 60, image: '/images/tomato.jpg' },
    { id: 8, name: 'Carrot', price: 70, image: '/images/carrot.jpg' },
  ],
};

const CategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart(); // Now accessing cartItems from context
  const [searchTerm, setSearchTerm] = useState('');

  const products = sampleProducts[categoryName.toLowerCase()] || [];

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Check if the product is already in the cart
  const isProductInCart = (productId) => cartItems.some(item => item.id === productId);

  return (
    <div className="category-page">
      <div className="category-header">
        <button className="go-back-btn" onClick={() => navigate('/shop')}>
          ← Back to Categories
        </button>

        {/* Search Bar */}
        <input
          type="text"
          className="search-bar"
          placeholder="Search Products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Display the category name */}
      <h2>{categoryName.replace(/-/g, ' ').toUpperCase()}</h2>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Rs. {product.price}</p>
            <button 
              onClick={() => addToCart(product)}
              disabled={isProductInCart(product.id)} // Disable button if product is in cart
            >
              {isProductInCart(product.id) ? 'Added' : 'Add to Cart'}
            </button> 
            <button className="buy-now">Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
