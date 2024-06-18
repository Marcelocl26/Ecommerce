import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { token } = useAuth();

  const fetchCartProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/cart', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCart(response.data.products);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchCartProducts();
    }
  }, [token]);

  const addToCart = async (productId, quantity) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/cart',
        { productId, quantity }, // Pasa la cantidad aquí
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setCart(response.data.products);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCart(response.data.products);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, fetchCartProducts }}>
      {children}
    </CartContext.Provider>
  );
};
