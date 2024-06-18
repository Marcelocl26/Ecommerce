import express from 'express';
import { createUser, loginUser, logoutUser } from '../controllers/user.controllers.js';
import { body, validationResult } from 'express-validator';
import { authenticateUser } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Ruta para crear un nuevo usuario
router.post('/register', [
  body('username').notEmpty().withMessage('El nombre de usuario es requerido'),
  body('email').isEmail().withMessage('Correo electrónico inválido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newUser = await createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para iniciar sesión de usuario
router.post('/login', [
  body('email').isEmail().withMessage('Correo electrónico inválido'),
  body('password').notEmpty().withMessage('La contraseña es requerida')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const token = await loginUser(req.body);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

// Ruta protegida para obtener datos del usuario
router.get('/user', authenticateUser, (req, res) => {
  res.status(200).json(req.user);
});

// Ruta para logout
router.post('/logout', (req, res) => {
  res.clearCookie('token').json({ message: 'Logout exitoso' });
});

export default router;
