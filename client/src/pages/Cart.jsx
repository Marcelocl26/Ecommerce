import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const Cart = () => {
  const { cart, fetchCartProducts, removeFromCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchCartProducts();
        setLoading(false);
      } catch (error) {
        setError('Error al obtener los productos en el carrito');
        setLoading(false);
      }
    };

    if (cart.length === 0) {  // Solo fetch si el carrito está vacío
      fetchData();
    } else {
      setLoading(false); // No está cargando si ya hay productos
    }
  }, [cart, fetchCartProducts]);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [cart]);

  const handleRemoveFromCart = async (productId) => {
    setLoading(true);
    try {
      await removeFromCart(productId);
    } catch (error) {
      setError('Error al eliminar el producto del carrito');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/create-order', {
        amount: Math.round(totalPrice), // Convertir el totalPrice a entero
        email: 'cliente@example.com' // Reemplaza con el email del usuario
      });
      window.location.href = response.data.url;
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  if (loading) {
    return <p className="text-center py-8">Cargando...</p>;
  }

  if (error) {
    return <p className="text-center py-8 text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Carrito de compras</h1>
      <p className="mb-4">Cantidad de productos en el carrito: <span className="font-semibold">{cart.length}</span></p>
      <h2 className="text-2xl font-semibold mb-4">Productos en el carrito:</h2>
      <ul className="space-y-4">
        {cart.map(item => (
          <li key={item.product._id} className="border p-4 rounded shadow-lg flex flex-col md:flex-row items-center md:items-start">
            {item.product.image && (
              <img src={`http://localhost:3000/${item.product.image}`} alt={item.product.name} className="w-24 h-24 object-cover mr-4 mb-4 md:mb-0" />
            )}
            <div className="flex-1">
              <p className="text-lg font-semibold">{item.product.name}</p>
              <p className="text-sm text-gray-600">Precio unitario: ${item.product.price.toFixed(2)}</p>
              <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
              <p className="text-sm text-gray-600">Precio total: ${(item.product.price * item.quantity).toFixed(2)}</p>
            </div>
            <button onClick={() => handleRemoveFromCart(item.product._id)} className="bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-600 transition duration-300">
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Precio final:</h2>
        <p className="text-3xl font-bold text-blue-600">${totalPrice.toFixed(2)}</p>
        <button onClick={handleCheckout} className="bg-blue-500 text-white px-4 py-2 rounded mt-4 shadow-md hover:bg-blue-600 transition duration-300">
          Pagar
        </button>
      </div>
    </div>
  );
};

export default Cart;
