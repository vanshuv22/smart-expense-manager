const Expense = require("../models/Expense");
const Budget = require("../models/Budget");
const checkRules = require("../utils/ruleEngine");

exports.addExpense = async (req, res) => {
  try {
    const { title, amount, category, dates, notes } = req.body;

    const expense = await Expense.create({
      title,
      amount,
      category,
      dates,
      notes
    });

  
    let alerts = [];

    if (category === "Food" && amount > 5000) {
      alerts.push(" High Food Expense!");
    }

    const allExpenses = await Expense.find();
    const total = allExpenses.reduce((acc, e) => acc + e.amount, 0);

    const budgetData = await Budget.findOne();
    const budget = budgetData ? budgetData.amount : 0;

    if (total > budget) {
      alerts.push("Budget Exceeded!");
    }

    res.status(201).json({ expense, alerts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const data = await Expense.find().sort({ dates: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const updated = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

