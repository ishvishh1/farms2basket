import React from 'react';
import { useCart } from '../../context/CartContext';
import './CartPage.css'; 

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h2>My Cart</h2>
        {cartItems.length > 0 && (
          <button className="clear-cart-btn" onClick={clearCart}>
            Clear Cart
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-grid">
          {cartItems.map((item, index) => (
            <div className="cart-item" key={index}>
              <img src={item.image} alt={item.name} className="cart-item-img" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>Rs. {item.price}</p>
                <div className="cart-item-actions">
                  <button className="buy-now-btn">Buy Now</button>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
