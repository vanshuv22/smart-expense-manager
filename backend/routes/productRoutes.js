const express = require("express");
const router = express.Router();
const Product = require("../models/products");
const authMiddleware = require("../Middleware/AuthMiddleware");

router.post("/add-product", async (req, res) => {
  const product = await Product.create(req.body);

  res.send(product);
});

router.get("/products",authMiddleware, async (req, res) => {
  const products = await Product.find();

  res.send(products);
});


router.get("/product/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);

  res.send(product);
});

router.put("/update-product/:id", async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body);

   res.send(product);
});

router.delete("/update-product/:id", async (req, res) => {
    const product = await product.findByIdAndDelete(req.params.id);

    res.send ({
        Message: "Product Delete"
    })
})

module.exports = router;
