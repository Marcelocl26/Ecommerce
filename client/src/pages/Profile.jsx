import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Menu from './Menu';
import { Outlet } from 'react-router-dom';

const Profile = () => {
  const { token } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error);
      }
    };

    fetchUserProfile();
  }, [token]);

  if (!user) return <div className="text-center py-8">Cargando...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Menu /> {/* Renderiza el componente Menu */}
      <h1 className="text-3xl font-bold mb-4">Perfil del Usuario</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <p className="text-lg font-semibold">Nombre:</p>
          <p className="text-xl">{user.username}</p>
          <p className="text-lg font-semibold mt-4">Email:</p>
          <p className="text-xl">{user.email}</p>
          {/* Puedes agregar más campos del perfil aquí */}
        </div>
      </div>
      <Outlet /> {/* Renderiza las rutas anidadas dentro de Profile */}
    </div>
  );
};

export default Profile;
