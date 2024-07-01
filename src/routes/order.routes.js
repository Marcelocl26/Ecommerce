import express from 'express';
import { createOrder, handlePaymentNotification, getOrders, getAllOrders,updateOrderStatus }  from '../controllers/createorder.controller.js';
import { authenticateUser } from '../middlewares/auth.middleware.js';
import { isAdmin } from '../middlewares/auth.middleware.js';



const router = express.Router();

router.post('/create-order',  authenticateUser,createOrder); 
router.get('/payment-success', handlePaymentNotification);

router.get('/orders',  authenticateUser,getOrders);
router.get('/orders/admin',  authenticateUser,getOrders, isAdmin);
router.get('/all', authenticateUser, isAdmin, getAllOrders); // Ruta para obtener todas las órdenes (solo accesible para administradores)
router.patch('/orders/:orderId', authenticateUser, updateOrderStatus);


export default router;
