const Budget = require("../models/Budget");

exports.setBudget = async (req, res) => {
  try {
    const { month, amount } = req.body;

    const budget = new Budget({ month, amount });
    await budget.save();

    res.status(201).json(budget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBudget = async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};








 
