import Product from '../models/product.model.js';

// Obtener todos los productos
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

// Crear un producto
export const createProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error });
  }
};

// Obtener un producto por ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
};

// Actualizar un producto
export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
};

// Eliminar un producto
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
};

// Obtener productos filtrados por categoría
// Obtener productos filtrados por categoría
export const getProductsByCategory = async (req, res) => {
  const category = req.params.category; // Obtener la categoría de los parámetros de la solicitud
  try {
    const products = await Product.find({ category: category }); // Buscar productos con la categoría proporcionada
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products by category', error });
  }
};

export const getProductsByCategoryName = async (req, res) => {
  const categoryName = req.params.categoryName;
  try {
    const products = await Product.find({ category: categoryName });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products by category name', error });
  }
};


// Obtener todas las categorías
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error });
  }
};


export const searchProducts = async (req, res) => {
  try {
      const query = req.query.query;
      if (!query) {
          return res.status(400).send('Query parameter is required');
      }
      const products = await Product.find({ name: new RegExp(query, 'i') });
      res.json(products);
  } catch (error) {
      console.error('Error en la búsqueda:', error);
      res.status(500).send('Error en la búsqueda');
  }
};