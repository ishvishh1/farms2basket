import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add item to cart or increase quantity if it already exists
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  // Remove an item completely from the cart
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  // Clear all items from the cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Optional: Get total price
  const getTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Optional: Get total quantity
  const getTotalQuantity = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalPrice,
        getTotalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
