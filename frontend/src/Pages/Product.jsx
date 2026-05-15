import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductList from "../components/ProductList";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Product = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");

    localStorage.removeItem("user");
    navigate("/signin");
    toast.success("Logged out successfully");
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    const res = await axios.get("http://localhost:5000/api/product/products", {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    setProducts(res.data);
  };

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold text-center mb-10">E-Commerce Store</h1>

      <button
        onClick={handleLogout}
        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm ml-530"
      >
        Sign Out
      </button>

      <ProductList products={products} addToCart={addToCart} />
    </div>
  );
};

export default Product;
