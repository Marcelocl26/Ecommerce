import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
  const [product, setProduct] = useState({
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
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [replacementImageIndex, setReplacementImageIndex] = useState(null);
  const navigate = useNavigate();
  const { productId } = useParams();

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/products/${productId}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/categoriess');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    console.log('Files selected:', files);  // Debugging line

    if (replacementImageIndex !== null) {
      const updatedImages = [...product.images];
      updatedImages[replacementImageIndex] = URL.createObjectURL(files[0]);
      setProduct({ ...product, images: updatedImages });
      setSelectedFiles((prevFiles) => {
        const newFiles = [...prevFiles];
        newFiles[replacementImageIndex] = files[0];
        return newFiles;
      });
      setReplacementImageIndex(null);
    } else {
      setSelectedFiles([...selectedFiles, ...files]);
      setProduct({ ...product, images: [...product.images, ...files.map(file => URL.createObjectURL(file))] });
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = product.images.filter((_, i) => i !== index);
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setProduct({ ...product, images: newImages });
    setSelectedFiles(newFiles);
  };

  const handleReplaceImage = (index) => {
    setReplacementImageIndex(index);
    document.getElementById('imageUpload').click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('category', product.category);
    formData.append('brand', product.brand);
    formData.append('countInStock', product.countInStock);
    formData.append('rating', product.rating);
    formData.append('numReviews', product.numReviews);

    const existingImages = product.images.filter(image => !image.startsWith('blob:'));
    if (existingImages.length > 0) {
      formData.append('existingImages', existingImages.join(','));
    }

    product.images.forEach((image, index) => {
      if (image.startsWith('blob:')) {
        formData.append('images', selectedFiles[index]);
      }
    });

    try {
      await axios.put(`http://localhost:3000/api/products/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      navigate('/admin/products');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="edit-product-container p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Producto</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nombre</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Descripción</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Precio</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Categoría</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((category) => (
              <option key={category._id} value={category._name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Marca</label>
          <input
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Stock</label>
          <input
            type="number"
            name="countInStock"
            value={product.countInStock}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Rating</label>
          <input
            type="number"
            name="rating"
            value={product.rating}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Reseñas</label>
          <input
            type="number"
            name="numReviews"
            value={product.numReviews}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Imágenes</label>
          <input
            type="file"
            id="imageUpload"
            name="images"
            multiple
            onChange={handleFileChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            style={{ display: 'none' }}
          />
          <button
            type="button"
            onClick={() => document.getElementById('imageUpload').click()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Agregar Imágenes
          </button>
          {product.images.length > 0 && (
            <div className="mt-2 grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <div key={index} className="relative group">
                  <img src={image.startsWith('blob:') ? image : `http://localhost:3000${image}`} alt={product.name} className="w-full h-32 object-cover rounded-md" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    X
                  </button>
                  <button
                    type="button"
                    onClick={() => handleReplaceImage(index)}
                    className="absolute bottom-1 right-1 bg-yellow-500 text-white rounded-full px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Reemplazar
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Actualizar Producto
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
