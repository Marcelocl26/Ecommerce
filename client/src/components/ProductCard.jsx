import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={`http://localhost:3000/${product.image}`} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Precio: ${product.price}</p>
      <p>Categoría: {product.category}</p>
      <p>Stock: {product.countInStock}</p>
      {/* Otros detalles según tu modelo de datos */}
    </div>
  );
};

export default ProductCard;
