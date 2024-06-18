// routes/profile.routes.js
import express from 'express';
import { getProfile } from '../controllers/profile.controller.js';
import { authenticateUser } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/profile', authenticateUser, getProfile);

export default router;
