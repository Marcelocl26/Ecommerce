import mercadopago from 'mercadopago';
import dotenv from 'dotenv';

dotenv.config(); // Cargar las variables de entorno desde el archivo .env

console.log('MercadoPago Access Token:', process.env.MERCADOPAGO_ACCESS_TOKEN);

mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
});

const createOrder = async (req, res) => {
  const { amount, email } = req.body;

  const preference = {
    items: [
      {
        title: 'Compra en Ecommerce',
        quantity: 1,
        currency_id: 'CLP',
        unit_price: amount,
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
    res.json({ url: response.body.init_point });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).send('Error creating order');
  }
};

export default createOrder;
