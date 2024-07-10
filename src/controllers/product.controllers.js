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
  try {
    const { name, description, price, category, brand, countInStock, rating, numReviews } = req.body;

    // Comprueba si hay archivos en req.files y construye un array de rutas de imagen
    const images = req.files ? req.files.map(file => `/images/${file.filename}`) : [];

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      brand,
      images, // Guarda el array de rutas de imágenes
      countInStock,
      rating,
      numReviews
    });

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
    const { id } = req.params;
    const { name, description, price, category, brand, countInStock, rating, numReviews } = req.body;

    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update product fields
    existingProduct.name = name;
    existingProduct.description = description;
    existingProduct.price = price;
    existingProduct.category = category;
    existingProduct.brand = brand;
    existingProduct.countInStock = countInStock;
    existingProduct.rating = rating;
    existingProduct.numReviews = numReviews;


    const existingImages = req.body.existingImages ? req.body.existingImages.split(',') : [];
    existingProduct.images = existingImages;

   
    if (req.files) {
      req.files.forEach(file => {
        existingProduct.images.push(`/images/${file.filename}`);
      });
    }

    const updatedProduct = await existingProduct.save();
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


export const getProductsByCategory = async (req, res) => {
  const category = req.params.category; 
  try {
    const products = await Product.find({ category: category });
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