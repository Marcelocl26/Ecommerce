import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/products/${id}`);
        setProduct(response.data);
        setSelectedImage(response.data.images[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los detalles del producto:', error);
        setError('Error al obtener los detalles del producto');
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product._id, quantity);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/200'; // URL a una imagen predeterminada externa
  };

  if (loading) {
    return <div className="text-center">Cargando...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="text-center">No se encontró el producto</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 flex flex-col items-center">
          <img 
            src={`http://localhost:3000/${selectedImage}`} 
            alt={product.name} 
            className="w-full h-96 object-cover mb-4 border"
            onError={handleImageError} 
          />
          <div className="flex space-x-2">
            {product.images.map((image, index) => (
              <img 
                key={index}
                src={`http://localhost:3000/${image}`} 
                alt={`${product.name} ${index + 1}`} 
                className={`w-20 h-20 object-cover cursor-pointer border ${selectedImage === image ? 'border-blue-500' : 'border-gray-300'}`}
                onClick={() => setSelectedImage(image)}
                onError={handleImageError}
              />
            ))}
          </div>
        </div>
        <div className="md:w-1/2 md:pl-6">
          <p className="text-lg mb-4">{product.description}</p>
          <p className="text-2xl font-semibold mb-4">Precio: ${product.price}</p>
          <p className="text-lg mb-2">Categoría: {product.category}</p>
          <p className="text-lg mb-2">Marca: {product.brand}</p>
          <p className="text-lg mb-4">Disponibilidad: {product.countInStock > 0 ? 'En stock' : 'Agotado'}</p>
          <p className="text-lg mb-4">Valoración: {product.rating} ({product.numReviews} reseñas)</p>
          <div className="flex items-center mb-4">
            <button 
              className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-l hover:bg-gray-300" 
              onClick={decreaseQuantity}
            >
              -
            </button>
            <span className="px-4 py-2 bg-white text-gray-700 font-semibold">{quantity}</span>
            <button 
              className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-r hover:bg-gray-300" 
              onClick={increaseQuantity}
            >
              +
            </button>
          </div>
          <button 
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600" 
            onClick={handleAddToCart}
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
