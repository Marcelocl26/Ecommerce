import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';
import Order from '../models/order.model.js';
import dotenv from 'dotenv';

dotenv.config();

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
  options: { timeout: 5000 }
});

export const createOrder = async (req, res) => {
  const { amount, email, address, products } = req.body;

  if (!req.user || !req.user._id) {
    return res.status(400).send('Usuario no autenticado');
  }

  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).send('No se proporcionaron productos válidos');
  }

  const productsToOrder = products.map(product => ({
    productId: product._id,
    quantity: product.quantity
  }));

  const preference = new Preference(client);
  const body = {
    items: products.map(product => ({
      title: product.name,
      quantity: product.quantity,
      currency_id: 'CLP',
      unit_price: Math.round(product.price),
    })),
    payer: {
      email: email,
    },
    back_urls: {
      success: `http://localhost:3000/api/payment-success`,
      failure: 'http://localhost:5173/failure',
      pending: 'http://localhost:5173/pending',
    },
    auto_return: 'approved',
    external_reference: JSON.stringify({ userId: req.user._id, products: productsToOrder, totalPrice: Math.round(amount) })
  };

  try {
    const response = await preference.create({ body });
    res.json({ url: response.body.init_point });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).send('Error creating order');
  }
};

export const handlePaymentNotification = async (req, res) => {
  const { collection_id, collection_status, external_reference } = req.query;

  if (!collection_id || !collection_status || !external_reference) {
    console.log('Missing parameters:', req.query);
    return res.status(400).send('Missing parameters');
  }

  try {
    if (collection_status === 'approved') {
      const { userId, products, totalPrice } = JSON.parse(external_reference);

      const newOrder = new Order({
        userId: userId,
        products: products,
        totalPrice: totalPrice,
        status: 'Pagada'
      });

      await newOrder.save();
      res.redirect('http://localhost:5173/compra-exitosa');
    } else {
      console.log('Payment not approved:', collection_status);
      res.status(200).send('Payment not approved');
    }
  } catch (error) {
    console.error('Error handling payment notification:', error);
    res.status(500).send('Error handling payment notification');
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId').populate('products.productId');
    res.status(200).json(orders);
  } catch (error) {
    console.error(`Error fetching orders: ${error.message}`);
    res.status(500).json({ message: 'Ocurrió un error en el servidor' });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const newStatus = req.body.status;

    const updatedOrder = await Order.findByIdAndUpdate(orderId, { status: newStatus }, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Orden no encontrada' });
    }

    res.json(updatedOrder);
  } catch (error) {
    console.error('Error actualizando el estado de la orden:', error);
    res.status(500).json({ error: 'Error actualizando el estado de la orden' });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).populate('products.productId');
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).send('Error fetching orders');
  }
};

export { getOrders };
