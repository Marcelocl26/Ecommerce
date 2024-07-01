import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [statusChanges, setStatusChanges] = useState({});
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user.role === 'admin') {
      axios.get('http://localhost:3000/api/all', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        console.log('Fetched orders:', response.data);
        setOrders(response.data);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
    }
  }, [isAuthenticated, user]);

  const handleStatusChange = (orderId, newStatus) => {
    setStatusChanges(prev => ({
      ...prev,
      [orderId]: newStatus
    }));
  };

  const saveStatusChanges = () => {
    const promises = Object.entries(statusChanges).map(([orderId, newStatus]) =>
      axios.patch(`http://localhost:3000/api/orders/${orderId}`, { status: newStatus }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        console.log('Order updated:', response.data);
        setOrders(prevOrders => prevOrders.map(order => 
          order._id === orderId ? { ...order, status: newStatus } : order
        ));
      })
      .catch(error => {
        console.error('Error updating order status:', error);
      })
    );

    Promise.all(promises).then(() => {
      setStatusChanges({});
      alert('Estados de las órdenes actualizados correctamente.');
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Órdenes</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Usuario</th>
            <th className="px-4 py-2">Productos</th>
            <th className="px-4 py-2">Total</th>
            <th className="px-4 py-2">Estado</th>
            <th className="px-4 py-2">Fecha de Creación</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="border px-4 py-2">
                {order.userId ? order.userId.username : 'Usuario desconocido'}
              </td>
              <td className="border px-4 py-2">
                {order.products.map((item, index) => (
                  <div key={index}>
                    {item.productId ? item.productId.name : 'Producto desconocido'} (Cantidad: {item.quantity})
                  </div>
                ))}
              </td>
              <td className="border px-4 py-2">${order.totalPrice}</td>
              <td className="border px-4 py-2">
                <select
                  value={statusChanges[order._id] || order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                >
                  <option value="En proceso">En proceso</option>
                  <option value="Pagada">Pagada</option>
                  <option value="Cancelada">Cancelada</option>
                </select>
              </td>
              <td className="border px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
              <td className="border px-4 py-2">
                <button 
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => saveStatusChanges(order._id)}
                >
                  Guardar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <button 
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={saveStatusChanges}
        >
          Guardar Todos los Cambios
        </button>
      </div>
    </div>
  );
};

export default OrderList;
