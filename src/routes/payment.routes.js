// src/routes/payment.routes.js
import express from 'express';
import FlowApi from 'flowcl';

const router = express.Router();
const flow = new FlowApi({
  apiKey: 'TU_API_KEY_DE_FLOW',
  secret: 'TU_SECRET_KEY_DE_FLOW',
  apiUrl: 'https://www.flow.cl/api'
});

router.post('/create-order', async (req, res) => {
  try {
    const orderData = {
      commerceOrder: '123456', // Número de orden de tu comercio
      subject: 'Pago de prueba',
      amount: 1000, // Monto a cobrar
      email: 'cliente@example.com', // Email del cliente
      urlConfirmation: 'http://localhost:3000/api/confirmation',
      urlReturn: 'http://localhost:3000/success'
    };

    const response = await flow.createOrder(orderData);
    res.json(response);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).send('Error creating order');
  }
});


router.post('/confirmation', async (req, res) => {
     try {
       const { token } = req.body;
       const orderInfo = await flow.getStatus(token);
       // Procesar la confirmación del pago según el estado
       console.log(orderInfo);
       res.send('Confirmación recibida');
     } catch (error) {
       console.error('Error confirming payment:', error);
       res.status(500).send('Error confirming payment');
     }
   });

export default router;
