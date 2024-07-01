import express from 'express';
import { getAddresses, addAddress, deleteAddress } from '../controllers/address.controller.js';
import { authenticateUser } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/addresses', authenticateUser, getAddresses);
router.post('/addresses', authenticateUser, addAddress);
router.delete('/addresses/:id', authenticateUser, deleteAddress);

export default router;
