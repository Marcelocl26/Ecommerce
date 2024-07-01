import React, { useEffect } from 'react';

const PaymentSuccess = () => {
  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      window.location.href = '/compra-exitosa'; // Redirige después de 3 segundos
    }, 3000); // Cambia a tu lógica de temporización deseada

    return () => clearTimeout(redirectTimeout);
  }, []);

  return (
    <div>
      <h2>Pago exitoso</h2>
      <p>¡Gracias por su compra!</p>
      <p>Estamos redirigiéndolo a la página de compra exitosa...</p>
      {/* Puedes agregar más contenido aquí si es necesario */}
    </div>
  );
};

export default PaymentSuccess;
