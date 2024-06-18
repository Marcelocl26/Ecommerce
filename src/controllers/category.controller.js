import Category from '../models/category.model.js';

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error });
  }
};

export const createCategory = async (req, res) => {
  const { name, image } = req.body;
  
  if (!name || !image) {
    return res.status(400).json({ message: 'Name and image are required' });
  }

  try {
    const newCategory = new Category({ name, image });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error creating category', error });
  }
};
