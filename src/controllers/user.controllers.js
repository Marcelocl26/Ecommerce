import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key';

export async function createUser(userData) {
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = new User({ ...userData, password: hashedPassword });
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    throw new Error('Error al crear usuario: ' + error.message);
  }
}

export async function loginUser(userData) {
  try {
    const user = await User.findOne({ email: userData.email });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const isMatch = await bcrypt.compare(userData.password, user.password);
    if (!isMatch) {
      throw new Error('Contraseña incorrecta');
    }

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
    if (!token) {
      throw new Error('No se pudo generar el token');
    }

    return token; // Devolver el token generado
  } catch (error) {
    throw new Error('Error al iniciar sesión: ' + error.message);
  }
}


export async function logoutUser() {
  try {
    // Aquí podrías realizar cualquier lógica adicional relacionada con el cierre de sesión en el backend,
    // como invalidar sesiones o eliminar tokens de una lista de sesiones activas, dependiendo de tus requisitos.
    // En este ejemplo simple, simplemente retornaremos un mensaje de éxito.
    return "Sesión cerrada exitosamente";
  } catch (error) {
    throw new Error('Error al cerrar sesión: ' + error.message);
  }
}
