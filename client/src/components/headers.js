// Header.js
import React, { useState } from 'react';
import LoginForm from './LoginForm';

function Header() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  return (
    <header>
      <nav>
        {}
        <button onClick={handleLoginClick}>Iniciar Sesión</button>
      </nav>
      {showLoginModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
            <LoginForm />
            <button onClick={handleCloseModal}>Cerrar</button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
