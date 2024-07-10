import express from 'express';
import { searchProducts, getProductsByCategoryName,getAllProducts, createProduct, getProductById, updateProduct, deleteProduct, getProductsByCategory, getAllCategories } from '../controllers/product.controllers.js';
import { authenticateUser} from '../middlewares/auth.middleware.js';
import { isAdmin } from '../middlewares/auth.middleware.js';
const router = express.Router();

// Obtener todos los productos
router.get('/products', getAllProducts);

// Crear un producto
router.post('/products', authenticateUser, createProduct, isAdmin);

// Obtener un producto por ID
router.get('/products/:id', getProductById);

// Actualizar un producto por ID
router.put('/products/:id', authenticateUser, updateProduct);

// Eliminar un producto por ID
router.delete('/products/:id', authenticateUser, deleteProduct);

// Obtener productos filtrados por categoría
router.get('/products/categories/:category', getProductsByCategory);

// Obtener todas las categorías
router.get('/categories', getAllCategories);

router.get('/products/category/:categoryName', getProductsByCategoryName);

// Ruta para búsqueda de productos por nombre
router.get('/search', searchProducts);


export default router;
