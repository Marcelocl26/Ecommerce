// routes/category.routes.js
import express from 'express';
import { getCategories, createCategory } from '../controllers/category.controller.js';

const router = express.Router();

router.get('/categoriess', (req, res, next) => {
     console.log('GET /categories');
     next();
   }, getCategories);
   
   router.post('/categorie/', (req, res, next) => {
     console.log('POST /categories');
     next();
   }, createCategory);


   router.get('/category/:categoryName', async (req, res) => {
    try {
      const { categoryName } = req.params;
      const products = await Product.find({ category: categoryName });
      res.json(products);
    } catch (error) {
      console.error('Error fetching products by category:', error);
      res.status(500).json({ message: 'Error fetching products by category' });
    }
  });
  
export default router;
