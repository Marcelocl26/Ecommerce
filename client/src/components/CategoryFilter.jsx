import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="category-filter">
      <h3>Filtrar por Categoría</h3>
      <ul>
        <li
          key="all"
          className={selectedCategory === '' ? 'active' : ''}
          onClick={() => onSelectCategory('')}
        >
          Todos
        </li>
        {categories.map(category => (
          <li
            key={category._id}
            className={selectedCategory === category.name ? 'active' : ''}
            onClick={() => onSelectCategory(category.name)}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;
