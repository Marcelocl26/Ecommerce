import React, { useEffect } from 'react';

const PaymentSuccess = () => {
  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      window.location.href = '/compra-exitosa'; 
    }, 3000); 

    return () => clearTimeout(redirectTimeout);
  }, []);

  return (
    <div>
      <h2>Pago exitoso</h2>
      <p>¡Gracias por su compra!</p>
      <p>Estamos redirigiéndolo a la página de compra exitosa...</p>
      {}
    </div>
  );
};

export default PaymentSuccess;
