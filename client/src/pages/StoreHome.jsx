import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Categories from '../components/Categories';
import Banner from '../components/Banner'; // Importa el componente Banner
import { HeartIcon } from '@heroicons/react/solid';
import './StoreHome.css';

function StoreHome() {
  const [productsByCategory, setProductsByCategory] = useState({});
  const [featuredProducts, setFeaturedProducts] = useState([]); // Estado para productos destacados
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState([]);

  // Fetch products and group them by category
  useEffect(() => {
    axios.get('http://localhost:3000/api/products')
      .then(response => {
        const products = response.data;
        const groupedProducts = products.reduce((acc, product) => {
          const categoryName = product.category?.name || 'Uncategorized';
          if (!acc[categoryName]) {
            acc[categoryName] = [];
          }
          acc[categoryName].push(product);
          return acc;
        }, {});
        setProductsByCategory(groupedProducts);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });

    // Fetch featured products
    axios.get('http://localhost:3000/api/featured')
      .then(response => {
        setFeaturedProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching featured products:', error);
      });

    // Fetch favorite products if the user is authenticated
    if (isAuthenticated) {
      axios.get('http://localhost:3000/api/favorites', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        setFavorites(response.data.map(product => product._id));
      })
      .catch(error => {
        console.error('Error fetching favorite products:', error);
      });
    }
  }, [isAuthenticated]);

  // Handle adding a product to the cart
  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      alert('Por favor inicia sesión para agregar productos al carrito');
      return;
    }
    addToCart(product);
  };

  // Toggle favorite status for a product
  const toggleFavorite = (productId) => {
    if (!isAuthenticated) {
      alert('Por favor inicia sesión para gestionar tus favoritos');
      return;
    }

    if (favorites.includes(productId)) {
      axios.delete(`http://localhost:3000/api/favorites/${productId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(() => {
        setFavorites(favorites.filter(id => id !== productId));
      })
      .catch(error => {
        console.error('Error removing favorite product:', error);
      });
    } else {
      axios.post('http://localhost:3000/api/favorites', { productId }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(() => {
        setFavorites([...favorites, productId]);
      })
      .catch(error => {
        console.error('Error adding favorite product:', error);
      });
    }
  };

  // Check if a product is a favorite
  const isFavorite = (productId) => {
    return favorites.includes(productId);
  };

  return (
    <div className="store-home p-4">
      <header className="store-header mb-4 text-center">
        <h1 className="text-4xl font-bold">¡Bienvenido a nuestra tienda!</h1>
      </header>
      <Banner /> {/* Añade el componente Banner aquí */}
      <Categories /> {/* Añade el componente Categories aquí */}

      {/* Sección de productos destacados */}
      <section className="featured-products my-8">
        <h2 className="text-3xl font-semibold mb-4">Productos Destacados</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.length > 0 ? (
            featuredProducts.map(product => (
              <li key={product._id} className="product-item border border-gray-200 p-6 rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105">
                {product.images && product.images.length > 0 && (
                  <img src={`http://localhost:3000/${product.images[0]}`} alt={product.name} className="product-image w-full h-48 object-cover mb-4 rounded-t-lg" />
                )}
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-lg font-medium text-gray-700">Precio: ${product.price}</p>
                <div className="product-actions flex justify-between items-center mt-4">
                  <button onClick={() => handleAddToCart(product)} className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">Añadir al carrito</button>
                  <div onClick={() => toggleFavorite(product._id)} className="cursor-pointer">
                    <HeartIcon className={`h-6 w-6 ${isFavorite(product._id) ? 'text-red-500' : 'text-gray-400'} transition-colors`} />
                  </div>
                  <Link to={`/product/${product._id}`} className="bg-gray-600 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-700 transition">
                    Ver detalles
                  </Link>
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-500 text-center">No hay productos destacados en este momento.</p>
          )}
        </ul>
      </section>

      <main className="product-list">
        {Object.keys(productsByCategory).map(category => (
          <section key={category} className="category-section mb-8">
            <h2 className="text-2xl font-semibold mb-4">{category}</h2>
            <ul className="category-products grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {productsByCategory[category].map(product => (
                <li key={product._id} className="product-item border border-gray-200 p-6 rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105">
                  {product.images && product.images.length > 0 && (
                    <img src={`http://localhost:3000/${product.images[0]}`} alt={product.name} className="product-image w-full h-48 object-cover mb-4 rounded-t-lg" />
                  )}
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-lg font-medium text-gray-700">Precio: ${product.price}</p>
                  <div className="product-actions flex justify-between items-center mt-4">
                    <button onClick={() => handleAddToCart(product)} className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">Añadir al carrito</button>
                    <div onClick={() => toggleFavorite(product._id)} className="cursor-pointer">
                      <HeartIcon className={`h-6 w-6 ${isFavorite(product._id) ? 'text-red-500' : 'text-gray-400'} transition-colors`} />
                    </div>
                    <Link to={`/product/${product._id}`} className="bg-gray-600 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-700 transition">
                      Ver detalles
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>

      <footer className="store-footer mt-8 text-center">
        <p>© 2023 Tienda Ejemplo. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default StoreHome;
