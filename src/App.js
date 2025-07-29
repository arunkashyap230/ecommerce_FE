// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductForm from "./pages/ProductForm";
import CustomerSignup from "./pages/CustomerSignup";
import { AuthProvider } from "./context/AuthContext";
import AllProducts from "./pages/AllProducts";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-product" element={<ProductForm />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/customer-signup" element={<CustomerSignup />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
