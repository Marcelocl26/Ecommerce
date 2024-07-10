import Product from '../models/product.model.js';
import Cart from '../models/cart.model.js';

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate('products.product');
    console.log(cart); 
    res.json(cart);
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    res.status(500).json({ message: "Error al obtener el carrito" });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body; 
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    const cart = await Cart.findOneAndUpdate(
      { userId: req.user._id },
      {
        $addToSet: {
          products: {
            product: product._id,
            quantity: quantity || 1, 
            price: product.price,
          },
        },
      },
      { new: true, upsert: true }
    ).populate('products.product');

    res.json(cart);
  } catch (error) {
    console.error('Error al agregar al carrito:', error);
    res.status(500).json({ message: "Error al agregar al carrito" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId: req.user._id },
      { $pull: { products: { product: req.params.productId } } },
      { new: true }
    ).populate('products.product');

    res.json(cart);
  } catch (error) {
    console.error('Error al eliminar del carrito:', error);
    res.status(500).json({ message: 'Error al eliminar del carrito' });
  }
};
