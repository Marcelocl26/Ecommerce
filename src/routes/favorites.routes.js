import express from 'express';
import { addFavorite, removeFavorite, getFavorites } from '../controllers/favorites.controller.js';
import { authenticateUser } from '../middlewares/auth.middleware.js'; 

const router = express.Router();

router.post('/favorites', authenticateUser, addFavorite);
router.delete('/favorites/:productId', authenticateUser, removeFavorite);
router.get('/favorites', authenticateUser, getFavorites);

export default router;
