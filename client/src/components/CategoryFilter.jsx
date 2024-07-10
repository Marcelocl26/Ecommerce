import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold mb-2">Filtrar por Categoría</h2>
      <ul className="flex space-x-4">
        {categories.map(category => (
          <li key={category._id}>
            <button
              onClick={() => onSelectCategory(category.name)}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === category.name
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;
