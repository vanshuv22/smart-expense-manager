const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  dates: { type: Date, default: Date.now },
  notes: { type: String, required: true },
});

module.exports = mongoose.model("Expense", expenseSchema);
