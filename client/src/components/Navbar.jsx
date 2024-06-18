import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { HeartIcon } from '@heroicons/react/solid'; // Asegúrate de tener Heroicons instalado y configurado
import './Navbar.css';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const [favoritesCount, setFavoritesCount] = useState(0);

    useEffect(() => {
        if (isAuthenticated) {
            axios.get('http://localhost:3000/api/favorites', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(response => {
                setFavoritesCount(response.data.length);
            })
            .catch(error => {
                console.error('Error fetching favorite products:', error);
            });
        }
    }, [isAuthenticated]);

    return (
        <nav className="navbar fixed top-16 left-0 w-full z-40">
            <div className="navbar-container">
                <ul className="navbar-menu">
                    <li className="navbar-item"><Link to="/" className="navbar-link">Inicio</Link></li>
                    {isAuthenticated ? (
                        <>
                            <li className="navbar-item"><Link to="/profile" className="navbar-link">Perfil</Link></li>
                            <li className="navbar-item">
                                <button onClick={logout} className="navbar-button">Cerrar Sesión</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="navbar-item"><Link to="/login" className="navbar-link">Iniciar Sesión</Link></li>
                            <li className="navbar-item"><Link to="/register" className="navbar-link">Registrarse</Link></li>
                        </>
                    )}
                    <li className="navbar-item">
                        <Link to="/cart" className="navbar-link">
                            <FontAwesomeIcon icon="shopping-cart" /> {/* Icono del carrito */}
                        </Link>
                    </li>
                    {isAuthenticated && (
                        <li className="navbar-item">
                            <Link to="/favorites" className="navbar-link">
                                <HeartIcon className="h-6 w-6 text-red-500" /> {/* Icono del corazón */}
                                {favoritesCount > 0 && (
                                    <span className="favorites-count">{favoritesCount}</span>
                                )}
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
