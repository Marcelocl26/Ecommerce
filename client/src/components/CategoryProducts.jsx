import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './CategoryProducts.css'; // Asegúrate de crear este archivo para estilos personalizados

function CategoryProducts() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    setLoading(true);
    setError('');

    axios.get(`http://localhost:3000/api/products/category/${categoryName}`)
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setError('Error al cargar los productos. Por favor, inténtalo de nuevo más tarde.');
        setLoading(false);
      });
  }, [categoryName]);

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      alert('Por favor inicia sesión para agregar productos al carrito');
      return;
    }
    addToCart(product);
  };

  return (
    <div className="category-products-container">
      <h2 className="text-2xl font-semibold mb-4">Productos en {categoryName}</h2>
      {loading && <p>Cargando productos...</p>}
      {error && <p>{error}</p>}
      <ul className="category-products-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <li key={product._id} className="product-item border p-4 rounded shadow">
            <h3 className="text-xl font-medium">{product.name}</h3>
            <p className="text-lg">Precio: ${product.price}</p>
            {product.image && (
              <img src={`http://localhost:3000/${product.image}`} alt={product.name} className="product-image w-full h-40 object-cover mb-4" />
            )}
            <div className="product-actions flex justify-between">
              <button onClick={() => handleAddToCart(product)} className="bg-blue-500 text-white px-4 py-2 rounded">Añadir al carrito</button>
              <Link to={`/product/${product._id}`} className="bg-gray-500 text-white px-4 py-2 rounded">
                Ver detalles
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryProducts;