import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./src/pages/Dashboard";
import Expenses from "./src/pages/Expenses";
import Product from "./src/pages/Product";

import Signup from "./src/pages/Signup";
import Signin from "./src/pages/Signin";

import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import ProductView from "./components/ProductView";
import Cart from "./components/Cart";
import ProtectedRoute from "./components/ProtectedRoute";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existing = cart.find((item) => item._id === product._id);

    if (existing) {
      const updatedCart = cart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );

      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    toast.success("Product Added Successfully");
  };

  const removeProduct = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
  };

  return (
    <BrowserRouter>
      <Navbar cart={cart} />

      <Routes>
        <Route path="/" element={<Signup />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/expenses"
          element={
            <ProtectedRoute>
              <Expenses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/product"
          element={
            <ProtectedRoute>
              <Product />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products"
          element={<ProductList addToCart={addToCart} />}
        />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/view-product/:id" element={<ProductView />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />

        <Route
          path="/cart"
          element={<Cart cart={cart} removeProduct={removeProduct} />}
        />
      </Routes>

      <ToastContainer position="top-right" autoClose={2000} />
    </BrowserRouter>
  );
}

export default App;
