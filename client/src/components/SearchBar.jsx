import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.trim() === '') {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3000/api/search?query=${query}`);
      setSearchResults(response.data);
      setShowDropdown(true); // Mostrar el desplegable al obtener resultados
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]);
      setShowDropdown(false); // Ocultar el desplegable si hay un error
    }
  };

  const handleBlur = () => {
    // Ocultar el desplegable cuando se pierde el foco del input
    setShowDropdown(false);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/search?query=${searchQuery}`);
      setSearchResults(response.data);
      setShowDropdown(true); // Mostrar el desplegable al obtener resultados
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]);
      setShowDropdown(false); // Ocultar el desplegable si hay un error
    }
  };

  const handleResultClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="relative">
      <div className="flex">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchQuery}
          onChange={handleChange}
          onBlur={handleBlur}
          className="py-2 px-4 border border-gray-300 rounded-l-md w-80 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleSearch}
          className="py-2 px-4 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none"
        >
          Buscar
        </button>
      </div>
      {showDropdown && searchResults.length > 0 && (
        <div className="absolute z-10 mt-1 w-80 bg-white border border-gray-300 shadow-lg rounded-md">
          <ul className="py-1">
            {searchResults.map((product) => (
              <li
                key={product._id}
                onMouseDown={() => handleResultClick(product._id)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {product.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      {showDropdown && searchResults.length === 0 && (
        <div className="absolute z-10 mt-1 w-80 bg-white border border-gray-300 shadow-lg rounded-md">
          <p className="px-4 py-2 text-gray-600">No se encontraron resultados</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
