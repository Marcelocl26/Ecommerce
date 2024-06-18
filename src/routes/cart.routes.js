import express from 'express';
import { getCart, addToCart, removeFromCart } from '../controllers/cart.controller.js';
import { authenticateUser } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/cart', authenticateUser, getCart);
router.post('/cart', authenticateUser, addToCart);
router.delete('/cart/:productId', authenticateUser, removeFromCart);

export default router;
