import express from 'express';
import {
  getAllCategoriesWithImages,
  addCategory,
  addSubcategory,
  getSubcategoriesByCategory,
  searchProducts,
  getProductsByCategoryName,
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  
  getProductsByCategory,
  getAllCategories,
  getFeaturedProducts
} from '../controllers/product.controllers.js';
import { authenticateUser, isAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Obtener todos los productos
router.get('/products', getAllProducts);

// Crear un producto
router.post('/products', authenticateUser, createProduct);

// Obtener un producto por ID
router.get('/products/:id', getProductById);

// Actualizar un producto por ID
router.put('/products/:id', authenticateUser, updateProduct);

// Eliminar un producto por ID
router.delete('/products/:id', authenticateUser, deleteProduct);

// Obtener productos filtrados por categoría
router.get('/products/categories/:category', getProductsByCategory);

// Obtener productos por nombre de categoría
router.get('/products/category/:categoryName', getProductsByCategoryName);

// Ruta para búsqueda de productos por nombre
router.get('/search', searchProducts);

// Obtener subcategorías por categoría
router.get('/categories/:categoryId/subcategories', getSubcategoriesByCategory);

// Añadir una nueva subcategoría
router.post('/categories/:categoryId/subcategories', authenticateUser, isAdmin, addSubcategory);

// Añadir una nueva categoría
router.post('/categories', authenticateUser, isAdmin, addCategory);

// Obtener todas las categorías (solo nombre)
router.get('/categories', getAllCategories);

// Obtener todas las categorías con imágenes
router.get('/categories-with-images', getAllCategoriesWithImages);

router.get('/featured', getFeaturedProducts);

export default router;
