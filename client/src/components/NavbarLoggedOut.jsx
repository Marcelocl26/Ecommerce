import React from 'react';
import { Link } from 'react-router-dom'; // Importa el componente Link de React Router

const NavbarLoggedOut = () => {
    return (
        <nav>
            {/* Navbar para usuarios no autenticados */}
            <ul>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/login">Iniciar Sesión</Link></li>
                <li><Link to="/register">Registrarse</Link></li>
            </ul>
        </nav>
    );
};

export default NavbarLoggedOut;
