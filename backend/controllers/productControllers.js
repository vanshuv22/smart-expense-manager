const product = require("../models/products");


const getAllProducts = async (req, res) => {
  const products = await Product.find();

  res.json(products);
};


const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  res.json(product);
}

const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);

  res.json({
    message: "Product deleted successfully",
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  deleteProduct,
};