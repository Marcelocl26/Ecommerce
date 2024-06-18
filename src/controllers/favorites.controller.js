import User from '../models/user.model.js';
import Product from '../models/product.model.js';

// Agregar producto a favoritos
export const addFavorite = async (req, res) => {
  try {
    const userId = req.user._id; // Suponiendo que estás usando middleware de autenticación para obtener el ID del usuario
    const productId = req.body.productId;

    // Verifica que el producto exista
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Agrega el producto a la lista de favoritos del usuario
    await User.findByIdAndUpdate(userId, {
      $addToSet: { favoriteProducts: productId }
    });

    res.status(200).json({ message: 'Producto añadido a favoritos' });
  } catch (error) {
    res.status(500).json({ message: 'Error al añadir el producto a favoritos', error });
  }
};

// Eliminar producto de favoritos
export const removeFavorite = async (req, res) => {
  try {
    const userId = req.user._id; // Suponiendo que estás usando middleware de autenticación para obtener el ID del usuario
    const { productId } = req.params;

    // Elimina el producto de la lista de favoritos del usuario
    await User.findByIdAndUpdate(userId, {
      $pull: { favoriteProducts: productId }
    });

    res.status(200).json({ message: 'Producto eliminado de favoritos' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto de favoritos', error });
  }
};

// Obtener lista de productos favoritos
export const getFavorites = async (req, res) => {
  try {
    const userId = req.user._id; // Suponiendo que estás usando middleware de autenticación para obtener el ID del usuario

    // Obtiene el usuario junto con los productos favoritos (poblados)
    const user = await User.findById(userId).populate('favoriteProducts');

    res.status(200).json(user.favoriteProducts);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos favoritos', error });
  }
};
