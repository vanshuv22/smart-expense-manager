import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { apiClient } from "../services/Api";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const token = localStorage.getItem("token");
    const res = await apiClient.get("/product/products");
    // const res = await axios.get("http://localhost:5000/api/product/products", {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });
    setProducts(res.data);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;

    const res = await axios.delete(
      `http://localhost:5000/api/product/delete-product/${id}`,
    );

    toast.success(res.data.message);

    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Product List</h1>

        <button
          onClick={() => navigate("/add-product")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold shadow"
        >
          + Add Product
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="text-left px-6 py-4">S.No.</th>
              <th className="text-left px-6 py-4">Name</th>
              <th className="text-left px-6 py-4">Description</th>
              <th className="text-left px-6 py-4">Price</th>
              <th className="text-left px-6 py-4">Discount Price</th>
              <th className="text-left px-6 py-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr
                  key={product._id}
                  className={
                    index % 2 === 0
                      ? "bg-white hover:bg-gray-50"
                      : "bg-gray-50 hover:bg-gray-100"
                  }
                >
                  <td className="px-6 py-4 border-b">{index + 1}</td>

                  <td className="px-6 py-4 border-b">{product.name}</td>
                  <td className="px-6 py-4 border-b">{product.description}</td>
                  <td className="px-6 py-4 border-b">₹{product.price}</td>
                  <td className="px-6 py-4 border-b">
                    ₹{product.discountPrice}
                  </td>

                  <td className="px-6 py-4 border-b">
                    <button
                      onClick={() => navigate(`/view-product/${product._id}`)}
                      className="bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-1 rounded-md text-sm"
                    >
                      View
                    </button>

                    <button
                      onClick={() => navigate(`/edit-product/${product._id}`)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm ml-2"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
