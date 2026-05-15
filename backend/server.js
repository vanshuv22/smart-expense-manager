const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv")
const connectDB = require("./config/db");
const expensesroute = require("./routes/expenseRoutes");
const budgetroute = require("./routes/budgetRoutes")
const analyticsroute = require("./routes/analyticsRoutes");

const { default: mongoose } = require("mongoose");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const productRoute = require("./routes/productRoutes");



app.use("/api/product", productRoute);
app.use("/api/expenses", expensesroute);
app.use("/api/budget", budgetroute);
app.use("/api/analytics", analyticsroute);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
