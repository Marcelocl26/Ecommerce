import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Categories.css'; 

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
    <div className="categories-container mb-8">
      <h2 className="text-2xl font-semibold mb-4">Categorías</h2>
      <div className="categories-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link to={`/category/${category.name}`} key={category.name} className="category-card border p-4 rounded shadow hover:bg-gray-100 transition duration-300">
            <img src={`http://localhost:3000/${category.image}`} alt={category.name} className="category-image w-full h-40 object-cover mb-4" />
            <h3 className="text-xl font-medium">{category.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Categories;
