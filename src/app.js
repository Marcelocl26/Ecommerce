import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import userRoutes from './routes/user.routes.js';
import productRoutes from './routes/product.routes.js';
import cartRoutes from './routes/cart.routes.js';
import profileRoutes from './routes/profile.routes.js';
import categoryRoutes from './routes/category.routes.js';
import favoritesRoutes from './routes/favorites.routes.js';
import orderRoutes from './routes/order.routes.js';
import addressRoutes from './routes/address.routes.js'; // Importa las rutas de direcciones
import { errorHandler } from './middlewares/error.middleware.js';
import { fileURLToPath } from 'url';
import Order from './models/order.model.js';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
dotenv.config();

app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH',],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.patch('/api/orders/:id', (req, res) => {
  const orderId = req.params.id;
  const newStatus = req.body.status;

  // Update the order status using findByIdAndUpdate
  Order.findByIdAndUpdate(orderId, { status: newStatus }, { new: true })
    .then(updatedOrder => {
      if (!updatedOrder) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.json(updatedOrder);
    })
    .catch(error => {
      console.error('Error updating order status:', error);
      res.status(500).json({ error: 'Error updating order status' });
    });
});
app.use(morgan('dev'));

// Rutas de la API
app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', profileRoutes);
app.use('/api', categoryRoutes);
app.use('/api', favoritesRoutes);
app.use('/api', orderRoutes);
app.use('/api', addressRoutes); // Usa las rutas de direcciones

// Middleware de manejo de errores
app.use(errorHandler);

export default app;
