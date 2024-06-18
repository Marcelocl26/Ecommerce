import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv'; // Añadir esta línea para importar dotenv
import bodyParser from 'body-parser'; // Añadir esta línea para importar body-parser
import userRoutes from './routes/user.routes.js';
import productRoutes from './routes/product.routes.js';
import cartRoutes from './routes/cart.routes.js';
import profileRoutes from './routes/profile.routes.js';
import categoryRoutes from './routes/category.routes.js';
import favoritesRoutes from './routes/favorites.routes.js';
import orderRoutes from './routes/order.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
dotenv.config();

// Configura CORS
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('dev'));

// Rutas de la API
app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', profileRoutes);
app.use('/api', categoryRoutes);
app.use('/api', favoritesRoutes);
app.use('/api', orderRoutes);

// Middleware de manejo de errores
app.use(errorHandler);

export default app;
