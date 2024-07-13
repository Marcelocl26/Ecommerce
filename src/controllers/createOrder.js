import mercadopago from 'mercadopago';
import dotenv from 'dotenv';

dotenv.config(); // Cargar las variables de entorno desde el archivo .env

// Imprime el token de acceso para verificar que se carga correctamente
console.log('MercadoPago Access Token:', process.env.MERCADOPAGO_ACCESS_TOKEN);

mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
});

const createOrder = async (req, res) => {
  const { amount, email } = req.body;

  // Convertir el amount a entero
  const amountInt = Math.round(amount);

  const preference = {
    items: [
      {
        title: 'Compra en Ecommerce',
        quantity: 1,
        currency_id: 'CLP',
        unit_price: amountInt, // Asegurarse de que es un entero
      },
    ],
    payer: {
      email: email,
    },
    back_urls: {
      success: 'http://localhost:5173/success',
      failure: 'http://localhost:5173/failure',
      pending: 'http://localhost:5173/pending',
    },
    auto_return: 'approved',
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    console.log('Response from MercadoPago:', response);

    if (response.body && response.body.init_point) {
      res.json({ url: response.body.init_point });
    } else {
      throw new Error('init_point is not defined in the response');
    }
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: error.message });
  }
};

export default createOrder;
