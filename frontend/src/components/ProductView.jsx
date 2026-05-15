import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductView = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);


  useEffect(() => {
    const fetchProduct = async () => {
        const token = localStorage.getItem("token")
        const res = await axios.get(
          `http://localhost:5000/api/product/product/${id}`,{
          headers: {
            'Authorization':`Bearer ${token}`,
          }
          }
        );

        setProduct(res.data);
      }

    fetchProduct();
  }, [id]);

  if (!product) {
    return <p className="p-10">Loading...</p>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">View Product</h2>

      <p className="mb-3">
        <strong>Name:</strong> {product.name}
      </p>

      <p className="mb-3">
        <strong>Description:</strong> {product.description}
      </p>

      <p className="mb-3">
        <strong>Category:</strong> {product.category}
      </p>

      <p className="mb-3">
        <strong>Price:</strong> ₹{product.price}
      </p>

      <p className="mb-3">
        <strong>Discount Price:</strong> ₹{product.discountPrice}
      </p>

      <p className="mb-3">
        <strong>Stock:</strong> {product.stock}
      </p>

      <button
        onClick={() => navigate("/products")}
        className="mt-4 bg-gray-600 text-white px-5 py-2 rounded hover:bg-gray-700"
      >
        Back
      </button>
    </div>
  );
};

export default ProductView;
