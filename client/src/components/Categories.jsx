import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/categories-with-images')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  return (
    <div className="categories-container my-12 px-4">
      <div className="bg-blue-800 py-1">
        <h2 className="text-3xl font-bold text-center text-white">Categorías</h2>
      </div>
      <div className="categories-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-4">
        {categories.map((category) => (
          <Link 
            to={`/category/${category.name}`} 
            key={category.name} 
            className="category-card bg-white border border-gray-200 p-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 flex items-center"
          >
            <div className="flex-1 pr-4">
              <h3 className="text-2xl font-semibold text-left text-gray-700">{category.name}</h3>
            </div>
            <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-md">
              <img 
                src={`http://localhost:3000/${category.image}`} 
                alt={category.name} 
                className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Categories;
