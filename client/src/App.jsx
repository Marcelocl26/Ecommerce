// src/App.jsx
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

function App() {
    return (
        <Router>
            <div className="app">
                <WhiteNavbar />
                <Navbar />
                <div className="content pt-32"> {}
                    <Routes>
                        <Route path="/" element={<StoreHome />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/product/:id" element={<ProductDetails />} />
                        <Route path="/profile" element={<Profile />} /> {}
                        <Route path="/categories" element={<Categories />} />
                        <Route path="/category/:categoryName" element={<CategoryProducts />} />
                        <Route path="/favorites" element={<FavoritesPage/>} />
                        <Route path="/search" element={<SearchResults />} /> {}

                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
