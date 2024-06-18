// SearchResults.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search).get('query');
    if (query) {
      axios.get(`http://localhost:3000/api/search?query=${query}`)
        .then(response => {
          setSearchResults(response.data);
        })
        .catch(error => {
          console.error('Error fetching search results:', error);
        });
    }
  }, [location.search]);

  return (
    <div>
      <h2>Resultados de la búsqueda:</h2>
      <ul>
        {searchResults.map(product => (
          <li key={product._id}>
            <Link to={`/product/${product._id}`}>
              {product.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
