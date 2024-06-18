import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar'; // Importa el componente SearchBar aquí

const WhiteNavbar = () => {
  return (
    <nav className="bg-white shadow-lg py-4 px-6 flex justify-between items-center fixed w-full top-0 z-50">
      <div className="flex items-center">
        <Link to="/" className="text-gray-800 text-lg font-semibold">
          Mi Tienda
        </Link>
      </div>
      <div className="flex items-center">
        {/* Aquí se incluye el componente SearchBar */}
        <SearchBar />
        <Link to="/cart" className="ml-4 text-gray-800">
          Carrito
        </Link>
      </div>
    </nav>
  );
};

export default WhiteNavbar;
