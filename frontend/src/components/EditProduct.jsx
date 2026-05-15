import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discountPrice: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/product/product/${id}`)
      .then((res) => setFormData(res.data));
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  const token = localStorage.getItem("token")
    await axios.put(
      `http://localhost:5000/api/product/update-product/${id}`,
      formData,
      {
        headers: {
         ' Authorization': `Bearer ${token}`,
        },
      },
    );

    toast.success("Product Updated Successfully");
    navigate("/products");
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Edit Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="number"
          name="discountPrice"
          value={formData.discountPrice}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
