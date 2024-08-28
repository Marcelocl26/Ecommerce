import mongoose from 'mongoose';

const SubcategorySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }
});

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  image: { type: String, trim: true }, // Campo de imagen agregado
  subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' }]
});

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' },
  price: { type: Number, required: true, min: 0 },
  description: { type: String, required: true, trim: true },
  images: [{ type: String, trim: true }],
  featured: { type: Boolean, default: false }, // Campo de destacado agregado
  rating: { type: Number, min: 0, max: 5, default: 0 }, // Campo de calificación agregado
  sales: { type: Number, default: 0 } // Campo de ventas agregado
}, {
  timestamps: true // Esto agregará campos createdAt y updatedAt automáticamente
});

const Category = mongoose.model('Category', CategorySchema);
const Subcategory = mongoose.model('Subcategory', SubcategorySchema);
const Product = mongoose.model('Product', ProductSchema);

export { Category, Subcategory, Product };
