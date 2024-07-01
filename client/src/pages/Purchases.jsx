import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { NavLink } from 'react-router-dom';

const Purchases = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/orders', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        setError('Error al obtener las órdenes');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  if (loading) {
    return <p className="text-center py-8">Cargando...</p>;
  }

  if (error) {
    return <p className="text-center py-8 text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="mb-4">
        <ul className="flex space-x-4">
          <li>
            <NavLink to="/profile" className="nav-link" activeClassName="nav-link-active">Perfil</NavLink>
          </li>
          <li>
            <NavLink to="/profile/purchases" className="nav-link" activeClassName="nav-link-active">Compras</NavLink>
          </li>
          <li>
            <NavLink to="/profile/addresses" className="nav-link" activeClassName="nav-link-active">Direcciones</NavLink>
          </li>
        </ul>
      </nav>

      <h1 className="text-3xl font-bold mb-4">Mis Compras</h1>
      {orders.length === 0 ? (
        <p>No has realizado ninguna compra.</p>
      ) : (
        orders.map(order => (
          <div key={order._id} className="bg-white shadow-md rounded-lg overflow-hidden p-6 mb-4">
            <h2 className="text-2xl font-semibold mb-2">Orden ID: {order._id}</h2>
            <p className="text-lg mb-2">Total: ${order.totalPrice}</p>
            <p className="text-lg mb-2">Dirección: {order.address}</p>
            <p className="text-lg mb-2">Estado: {order.status}</p>
            <h3 className="text-xl font-semibold mb-2">Productos:</h3>
            <ul>
              {order.products.map(item => (
                <li key={item.productId._id} className="mb-2">
                  <p className="text-lg">{item.productId.name}</p>
                  <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                  <p className="text-sm text-gray-600">Precio unitario: ${item.productId.price}</p>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default Purchases;
