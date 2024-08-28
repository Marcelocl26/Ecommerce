import { Product, Category, Subcategory } from '../models/product.model.js';
import mongoose from 'mongoose';

// Obtener todas las subcategorías
export const getAllSubcategories = async (req, res) => {
  try {
    const subcategories = await Product.distinct('subcategory');
    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subcategories', error });
  }
};

// Obtener todos los productos
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category subcategory');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

// Crear un producto
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, subcategory } = req.body;

    // Comprueba si hay archivos en req.files y construye un array de rutas de imagen
    const images = req.files ? req.files.map(file => `/images/${file.filename}`) : [];

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      subcategory,
      images // Guarda el array de rutas de imágenes
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
    const product = await Product.findById(req.params.id).populate('category subcategory');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
};

// Actualizar un producto
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, subcategory } = req.body;

    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Actualiza los campos del producto
    existingProduct.name = name;
    existingProduct.description = description;
    existingProduct.price = price;
    existingProduct.category = category;
    existingProduct.subcategory = subcategory;

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
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status (500).json({ message: 'Error deleting product', error });
  }
};

// Obtener productos por categoría
export const getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category }).populate('category subcategory');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products by category', error });
  }
};

// Obtener productos por nombre de categoría
export const getProductsByCategoryName = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.categoryName }).populate('category subcategory');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products by category name', error });
  }
};

// Obtener todas las categorías
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().select('name').exec();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error });
  }
};

// Buscar productos
export const searchProducts = async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).send('Query parameter is required');
    }
    const products = await Product.find({ name: new RegExp(query, 'i') }).populate('category subcategory');
    res.json(products);
  } catch (error) {
    console.error('Error en la búsqueda:', error);
    res.status(500).send('Error en la búsqueda');
  }
};
export const getSubcategoriesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const subcategories = await Subcategory.find({ parentCategory: categoryId });
    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subcategories', error });
  }
};

export const addCategory = async (req, res) => {
  try {
    const { name, image } = req.body;

    const newCategory = new Category({ name, image });
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error adding category', error });
  }
};

export const addSubcategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name } = req.body;

    // Verificar si el categoryId es un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ message: 'Invalid categoryId format' });
    }

    // Buscar la categoría por su ID
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Crear una nueva instancia de Subcategory con los datos proporcionados
    const newSubcategory = new Subcategory({ name, parentCategory: category._id });
    
    // Guardar la nueva subcategoría en la base de datos
    await newSubcategory.save();

    // Agregar la subcategoría al arreglo de subcategorías de la categoría
    category.subcategories.push(newSubcategory);
    await category.save();

    // Responder con la subcategoría creada
    res.status(201).json(newSubcategory);
  } catch (error) {
    // Capturar cualquier error y responder con un mensaje de error genérico
    console.error('Error adding subcategory:', error);
    res.status(500).json({ message: 'Error adding subcategory', error });
  }
};



// Obtener subcategorías de una categoría específica
export const getSubcategories = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId).populate('subcategories');
    res.status(200).json(category.subcategories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subcategories', error });
  }
};

export const getAllCategoriesWithImages = async (req, res) => {
  try {
    const categories = await Category.find().select('name image'); // Solo selecciona el nombre y la imagen
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Error fetching categories', error });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ featured: true });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos destacados', error });
  }
};