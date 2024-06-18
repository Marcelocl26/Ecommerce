import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key';

export function authenticateUser(req, res, next) {
  let token = req.headers.authorization?.split(' ')[1];

  if (!token && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No hay token proporcionado.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = { _id: decoded.id }; // Asegurarse de que req.user tenga la estructura correcta
    next();
  } catch (error) {
    console.error('Error al verificar el token:', error);
    res.status(401).json({ message: 'Token inválido.' });
  }
}
