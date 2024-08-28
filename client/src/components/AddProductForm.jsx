import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const AddProductForm = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    subcategory: '',
    images: [],
    countInStock: 0,
    featured: false,
  });

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    loadCategories();
  }, []);

  const handleCategoryChange = async (event) => {
    const { value } = event.target;
    setProductData({ ...productData, category: value });

    try {
      const response = await axios.get(`http://localhost:3000/api/categories/${value}/subcategories`);
      setSubcategories(response.data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length + productData.images.length > 4) {
      console.log('No puedes seleccionar más de 4 imágenes.');
      return;
    }
    setProductData({
      ...productData,
      images: [...productData.images, ...files],
    });
  };

  const removeImage = (index) => {
    const updatedImages = [...productData.images];
    updatedImages.splice(index, 1);
    setProductData({
      ...productData,
      images: updatedImages,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('description', productData.description);
    formData.append('price', productData.price);
    formData.append('category', productData.category);
    formData.append('subcategory', productData.subcategory);
    formData.append('countInStock', productData.countInStock);
    formData.append('featured', productData.featured); // Campo de destacado

    productData.images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      const response = await axios.post('http://localhost:3000/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('Producto agregado:', response.data);
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700">Nombre del producto</label>
        <input
          type="text"
          id="name"
          name="name"
          value={productData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          placeholder="Nombre del producto"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700">Descripción del producto</label>
        <textarea
          id="description"
          name="description"
          value={productData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          placeholder="Descripción del producto"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="price" className="block text-gray-700">Precio</label>
        <input
          type="number"
          id="price"
          name="price"
          value={productData.price}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          placeholder="Precio"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="category" className="block text-gray-700">Categoría</label>
        <select
          id="category"
          name="category"
          value={productData.category}
          onChange={handleCategoryChange}
          className="w-full px-3 py-2 border rounded-lg"
          required
        >
          <option value="">Selecciona una categoría</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>{category.name}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="subcategory" className="block text-gray-700">Subcategoría</label>
        <select
          id="subcategory"
          name="subcategory"
          value={productData.subcategory}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          required
        >
          <option value="">Selecciona una subcategoría</option>
          {subcategories.map((subcategory) => (
            <option key={subcategory._id} value={subcategory._id}>{subcategory.name}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="images" className="block text-gray-700">Imágenes del producto</label>
        <input
          type="file"
          id="images"
          onChange={handleImageChange}
          accept="image/*"
          multiple
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>

      {productData.images.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-4">
          {productData.images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(image)}
                alt={`Imagen ${index + 1}`}
                className="w-32 h-32 object-cover rounded-lg"
              />
              <button
                type="button"
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                onClick={() => removeImage(index)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="countInStock" className="block text-gray-700">Cantidad en stock</label>
        <input
          type="number"
          id="countInStock"
          name="countInStock"
          value={productData.countInStock}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          placeholder="Cantidad en stock"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="featured" className="block text-gray-700">Destacado</label>
        <input
          type="checkbox"
          id="featured"
          name="featured"
          checked={productData.featured}
          onChange={(e) => setProductData({ ...productData, featured: e.target.checked })}
          className="w-6 h-6"
        />
      </div>

      <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        Agregar Producto
      </button>
    </form>
  );
};

export default AddProductForm;
