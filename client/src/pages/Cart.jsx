import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, fetchCartProducts, removeFromCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [paymentUrl, setPaymentUrl] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchCartProducts();
        const response = await axios.get('http://localhost:3000/api/addresses', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setAddresses(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error al obtener los productos en el carrito o direcciones');
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchCartProducts]);

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
    if (!selectedAddress) {
      setError('Por favor selecciona una dirección antes de proceder al pago.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/create-order', {
        amount: Math.round(totalPrice),
        email: 'test_user_2049571288@testuser.com', // Reemplaza con un email ficticio
        address: selectedAddress,
        products: cart.map(item => ({
          _id: item.product._id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity
        }))
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const { url } = response.data;
      if (url) {
        window.location.href = url; // Redirigir a la URL de pago
      } else {
        setError('Error al redirigir a la página de pago');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      setError('Error al crear la orden. Por favor, inténtalo de nuevo más tarde.');
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
        <h2 className="text-2xl font-semibold mb-4">Selecciona una dirección de envío:</h2>
        {addresses.length > 0 ? (
          <div className="mb-4">
            <select
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={selectedAddress}
              onChange={(e) => setSelectedAddress(e.target.value)}
            >
              <option value="">Selecciona una dirección</option>
              {addresses.map((address) => (
                <option key={address._id} value={address._id}>
                  {address.address}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <p className="text-red-500">No tienes direcciones guardadas.</p>
        )}
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
