import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { HeartIcon } from '@heroicons/react/solid';

const FavoritesPage = () => {
    const { isAuthenticated } = useAuth();
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        if (isAuthenticated) {
            axios.get('http://localhost:3000/api/favorites', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(response => {
                setFavorites(response.data);
            })
            .catch(error => {
                console.error('Error fetching favorite products:', error);
            });
        }
    }, [isAuthenticated]);

    const toggleFavorite = (productId) => {
        axios.delete(`http://localhost:3000/api/favorites/${productId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(() => {
            setFavorites(prevFavorites => prevFavorites.filter(product => product._id !== productId));
        })
        .catch(error => {
            console.error('Error removing favorite product:', error);
        });
    };

    const isFavorite = (productId) => {
        return favorites.some(product => product._id === productId);
    };

    if (!isAuthenticated) {
        return <p className="text-center text-lg text-red-500">Por favor inicia sesión para ver tus productos favoritos.</p>;
    }

    return (
        <div className="favorites-page p-4">
            <h1 className="text-3xl font-bold mb-4">Mis Favoritos</h1>
            {favorites.length === 0 ? (
                <p className="text-center text-lg">No tienes productos en favoritos.</p>
            ) : (
                <ul className="favorites-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {favorites.map(product => (
                        <li key={product._id} className="favorite-item border p-4 rounded shadow hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-xl font-medium mb-2">{product.name}</h3>
                            <p className="text-lg mb-2">Precio: ${product.price}</p>
                            {product.image && (
                                <img src={`http://localhost:3000/${product.image}`} alt={product.name} className="product-image w-full h-48 object-cover mb-4 rounded" />
                            )}
                            <div className="flex justify-between items-center">
                                <Link to={`/product/${product._id}`} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-300">
                                    Ver detalles
                                </Link>
                                <button onClick={() => toggleFavorite(product._id)} className="cursor-pointer">
                                    <HeartIcon className={`h-6 w-6 ${isFavorite(product._id) ? 'text-red-500' : 'text-gray-500'}`} />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FavoritesPage;
