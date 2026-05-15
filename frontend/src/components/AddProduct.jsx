import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AddProduct = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discountPrice: "",
    category: "",
    stock: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token")
    const res = await axios.post(
      "http://localhost:5000/api/product/add-product",
      formData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      },
    );

    toast.success("Product Added Successfully");
    navigate("/products");
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Add Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="number"
          name="discountPrice"
          placeholder="Discount Price"
          value={formData.discountPrice}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
        >
          Add Product
        </button>

      </form>
    </div>
  );
};

export default AddProduct;
