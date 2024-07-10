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
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/products')
      .then(response => {
        const products = response.data;
        const groupedProducts = products.reduce((acc, product) => {
          const categoryName = product.category || 'Uncategorized';
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

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      alert('Por favor inicia sesión para agregar productos al carrito');
      return;
    }
    addToCart(product);
  };

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

  const isFavorite = (productId) => {
    return favorites.includes(productId);
  };

  return (
    <div className="store-home p-4">
      <header className="store-header mb-4">
        <h1 className="text-3xl font-bold">¡Bienvenido a nuestra tienda!</h1>
      </header>
      <Banner /> {/* Añade el componente Banner aquí */}
      <Categories />
      <main className="product-list">
        {Object.keys(productsByCategory).map(category => (
          <section key={category} className="category-section mb-8">
            <h2 className="text-2xl font-semibold mb-4">{category}</h2>
            <ul className="category-products grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {productsByCategory[category].map(product => (
                <li key={product._id} className="product-item border p-4 rounded shadow">
                  <h3 className="text-xl font-medium">{product.name}</h3>
                  <p className="text-lg">Precio: ${product.price}</p>
                  {product.images && product.images.length > 0 && (
                    <img src={`http://localhost:3000/${product.images[0]}`} alt={product.name} className="product-image w-full h-auto object-cover mb-4" />
                  )}
                  <div className="product-actions flex justify-between items-center">
                    <button onClick={() => handleAddToCart(product)} className="bg-blue-500 text-white px-4 py-2 rounded">Añadir al carrito</button>
                    <div onClick={() => toggleFavorite(product._id)} className="cursor-pointer">
                      <HeartIcon className={`h-6 w-6 ${isFavorite(product._id) ? 'text-red-500' : 'text-gray-500'}`} />
                    </div>
                    <Link to={`/product/${product._id}`} className="bg-gray-500 text-white px-4 py-2 rounded">
                      Ver detalles
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>
      <footer className="store-footer mt-8">
        <p>© 2023 Tienda Ejemplo. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default StoreHome;
