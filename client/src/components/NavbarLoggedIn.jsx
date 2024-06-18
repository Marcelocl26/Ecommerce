// src/components/NavbarLoggedIn.jsx
import React from 'react';

const NavbarLoggedIn = () => {
    return (
        <nav>
            {/* Navbar para usuarios autenticados */}
            <ul>
                <li>Inicio</li>
                <li>Perfil</li>
                <li>Cerrar Sesión</li>
            </ul>
        </nav>
    );
};

export default NavbarLoggedIn;
