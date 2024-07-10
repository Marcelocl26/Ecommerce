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
    brand: '',
    images: [],
    countInStock: 0,
    rating: 0,
    numReviews: 0,
  });

  const [categories, setCategories] = useState([]);

  const loadCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/categoriess');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

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
    formData.append('brand', productData.brand);
    productData.images.forEach((image, index) => {
      formData.append(`images`, image);
    });
    formData.append('countInStock', productData.countInStock);
    formData.append('rating', productData.rating);
    formData.append('numReviews', productData.numReviews);

    const token = localStorage.getItem('token');
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
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={productData.name} onChange={handleChange} placeholder="Nombre del producto" required />
      <textarea name="description" value={productData.description} onChange={handleChange} placeholder="Descripción del producto" required />
      <input type="number" name="price" value={productData.price} onChange={handleChange} placeholder="Precio" required />

      <select name="category" value={productData.category} onChange={handleChange} required>
        <option value="">Selecciona una categoría</option>
        {categories.map((category) => (
          <option key={category._id} value={category.name}>{category.name}</option>
        ))}
      </select>

      <input type="text" name="brand" value={productData.brand} onChange={handleChange} placeholder="Marca" required />
      <input type="file" onChange={handleImageChange} accept="image/*" multiple required />
      
      {productData.images.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-4">
          {productData.images.map((image, index) => (
            <div key={index} className="relative">
              <img src={URL.createObjectURL(image)} alt={`Imagen ${index + 1}`} className="w-32 h-32 object-cover" />
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

      <input type="number" name="countInStock" value={productData.countInStock} onChange={handleChange} placeholder="Cantidad en stock" required />
      <input type="number" name="rating" value={productData.rating} onChange={handleChange} placeholder="Rating" required />
      <input type="number" name="numReviews" value={productData.numReviews} onChange={handleChange} placeholder="Número de reviews" required />

      <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
        Agregar Producto
      </button>
    </form>
  );
};

export default AddProductForm;
