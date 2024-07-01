import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key';

export async function createUser(userData) {
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = new User({ ...userData, password: hashedPassword, role: 'user' });
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    throw new Error('Error al crear usuario: ' + error.message);
  }
}

export async function loginUser(userData) {
  const { email, password } = userData;
  const user = await User.findOne({ email });

  if (!user) {
      throw new Error('Invalid email or password');
  }

  // Verificar la contraseña usando comparePassword
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
      throw new Error('Invalid email or password');
  }

  const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
  return { token, user: { email: user.email, role: user.role, username: user.username } };
}
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password'); // Excluye la contraseña
    if (!user) {
      return res.status(404).send('Usuario no encontrado');
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).send('Error fetching user data');
  }
};

export async function logoutUser() {
  try {
    return "Sesión cerrada exitosamente";
  } catch (error) {
    throw new Error('Error al cerrar sesión: ' + error.message);
  }
}
