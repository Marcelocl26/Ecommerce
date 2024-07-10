import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/categoriess')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  return (
    <div className="categories-container my-8 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Categorías</h2>
      <div className="categories-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link 
            to={`/category/${category.name}`} 
            key={category.name} 
            className="category-card border p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
          >
            <img 
              src={`http://localhost:3000/${category.image}`} 
              alt={category.name} 
              className="category-image w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-2xl font-medium text-center">{category.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Categories;
