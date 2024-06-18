// src/pages/Dashboard.jsx
import React from 'react';

function Dashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Dashboard</h2>
          <p className="mt-2 text-center text-sm text-gray-600">Bienvenido a tu página de dashboard</p>
        </div>
        {/* Aquí puedes agregar contenido adicional de tu dashboard */}
      </div>
    </div>
  );
}

export default Dashboard;
