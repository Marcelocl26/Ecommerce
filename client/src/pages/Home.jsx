// Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Bienvenidfffo a Mi Tienda</h1>
      <p>Por favor, inicia sesión para continuar.</p>
      <Link to="/login">Iniciar Sesión</Link>
    </div>
  );
}

export default Home;
