// controllers/profile.controller.js
import User from '../models/user.model.js';

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password'); 
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error al obtener el perfil del usuario:', error);
    res.status(500).json({ message: 'Error al obtener el perfil del usuario' });
  }
};
