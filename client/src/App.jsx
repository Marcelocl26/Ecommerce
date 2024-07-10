import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StoreHome from './pages/StoreHome';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
import WhiteNavbar from './components/WhiteNavbar';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetails from './pages/ProductDetails';
import Profile from './pages/Profile';
import CategoryProducts from './components/CategoryProducts';
import Categories from './components/Categories';
import FavoritesPage from './pages/Favorites';
import SearchResults from './pages/SearchResults';
import Addresses from './pages/Addresses';
import Purchases from './pages/Purchases'; // Importa el componente Purchases
import PurchaseConfirmation from './components/PurchaseConfirmation';
import PaymentSuccess from './components/PaymentSuccess';
import OrderList from './components/OrderList'; // Importa el componente de la lista de órdenes
import AdminMenu from './components/AdminMenu';
import ProductList from './pages/Product.list'; 
import AddProductForm from './components/AddProductForm';

import EditProduct from './components/EditProduct';




function App() {
    return (
        <Router>
            <div className="app">
                <WhiteNavbar />
                <Navbar />
                <div className="content pt-32">
                    <Routes>
                        <Route path="/" element={<StoreHome />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/product/:id" element={<ProductDetails />} />
                        <Route path="/profile/*" element={<Profile />} />
                        <Route path="/categories" element={<Categories />} />
                        <Route path="/category/:categoryName" element={<CategoryProducts />} />
                        <Route path="/favorites" element={<FavoritesPage />} />
                        <Route path="/search" element={<SearchResults />} />
                        <Route path="/profile/addresses" element={<Addresses />} />
                        <Route path="/profile/purchases" element={<Purchases />} /> {/* Ruta para Purchases */}
                        <Route path="/compra-exitosa" element={<PurchaseConfirmation />} />
                        <Route path="/orders" element={<OrderList />} /> {/* Agrega la ruta para la lista de órdenes */}
                        <Route path="/admin" element={<AdminMenu />} /> {/* Agrega la ruta para la lista de órdenes */}
                        <Route path="/admin/products" element={<ProductList />} /> {/* Agrega la ruta para la lista de órdenes */}
                        <Route path="/admin/products/add" element={<AddProductForm />} />

                        <Route path="/admin/products/edit/:productId" element={<EditProduct />} /> {/* Agrega la ruta para EditProduct */}

                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
