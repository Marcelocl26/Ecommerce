import express from 'express';
import { addFavorite, removeFavorite, getFavorites } from '../controllers/favorites.controller.js';
import { authenticateUser } from '../middlewares/auth.middleware.js'; // Middleware de autenticación

const router = express.Router();

router.post('/favorites', authenticateUser, addFavorite);
router.delete('/favorites/:productId', authenticateUser, removeFavorite); // Cambiar aquí
router.get('/favorites', authenticateUser, getFavorites);

export default router;
