import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Menu from './Menu'; // Importa el componente Menu

const Addresses = () => {
  const { token } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState('');

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/addresses', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setAddresses(response.data);
      } catch (error) {
        console.error('Error al obtener las direcciones:', error);
      }
    };

    fetchAddresses();
  }, [token]);

  const handleAddAddress = async () => {
    if (newAddress.trim() === '') return;

    try {
      const response = await axios.post(
        'http://localhost:3000/api/addresses',
        { address: newAddress },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setAddresses([...addresses, response.data]);
      setNewAddress('');
    } catch (error) {
      console.error('Error al agregar la dirección:', error);
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/addresses/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setAddresses(addresses.filter((address) => address._id !== id));
    } catch (error) {
      console.error('Error al eliminar la dirección:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Menu /> {/* Renderiza el componente Menu */}
      <h1 className="text-3xl font-bold mb-4">Direcciones</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
        <ul>
          {addresses.map((address) => (
            <li key={address._id} className="flex justify-between items-center mb-4">
              <span>{address.address}</span>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => handleDeleteAddress(address._id)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
        <div className="flex mt-4">
          <input
            type="text"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            placeholder="Nueva dirección"
            className="border border-gray-300 rounded px-3 py-2 flex-grow"
          />
          <button
            onClick={handleAddAddress}
            className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
          >
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
};

export default Addresses;
