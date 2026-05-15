import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { apiClient } from "../services/Api";

const Signin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const res = await axios.post(
    //   "http://localhost:5000/api/auth/signin",
    //   formData
    // );
    const res = await apiClient.post("/auth/signin", formData);

    const token = res.data.token;

    localStorage.setItem("token", token);
    localStorage.setItem("isAuthenticated", "true");
    navigate("/Dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded"
        >
          Sign In
        </button>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signin;
