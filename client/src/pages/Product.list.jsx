import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import CategoryFilter from '../components/CategoryFilter';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = () => {
    axios.get('http://localhost:3000/api/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  };

  const fetchProducts = () => {
    const url = selectedCategory
      ? `http://localhost:3000/api/products/category/${encodeURIComponent(selectedCategory)}`
      : 'http://localhost:3000/api/products';

    axios.get(url)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleEditProduct = (productId) => {
    console.log(`Editar producto con ID: ${productId}`);
    // Redirige a la página de edición del producto
    navigate(`/admin/products/edit/${productId}`);
  };

  const handleAddProduct = () => {
    // Redirige a la página para agregar un nuevo producto
    navigate('/admin/products/add');
  };

  return (
    <div className="product-list-container p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Lista de Productos</h1>
        <button
          onClick={handleAddProduct}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Añadir Producto
        </button>
      </div>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
      />
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Nombre</th>
              <th className="px-4 py-2 border-b">Descripción</th>
              <th className="px-4 py-2 border-b">Precio</th>
              <th className="px-4 py-2 border-b">Categoría</th>
              <th className="px-4 py-2 border-b">Marca</th>
              <th className="px-4 py-2 border-b">Imágenes</th>
              <th className="px-4 py-2 border-b">Stock</th>
              <th className="px-4 py-2 border-b">Rating</th>
              <th className="px-4 py-2 border-b">Reseñas</th>
              <th className="px-4 py-2 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td className="px-4 py-2 border-b">{product.name}</td>
                <td className="px-4 py-2 border-b">{product.description}</td>
                <td className="px-4 py-2 border-b">${product.price}</td>
                <td className="px-4 py-2 border-b">{product.category.name}</td>
                <td className="px-4 py-2 border-b">{product.brand}</td>
                <td className="px-4 py-2 border-b">
                  <div className="flex">
                    {product.images.map((image, index) => (
                      <img key={index} src={`http://localhost:3000/${image}`} alt={`Imagen ${index + 1}`} className="w-12 h-12 object-cover mr-2" />
                    ))}
                  </div>
                </td>
                <td className="px-4 py-2 border-b">{product.countInStock}</td>
                <td className="px-4 py-2 border-b">{product.rating}</td>
                <td className="px-4 py-2 border-b">{product.numReviews}</td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => handleEditProduct(product._id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
