const express = require("express");
const router = express.Router();

const {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} = require("../controllers/expenseControllers");

router.post("/", addExpense);
router.get("/get", getExpenses);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

module.exports = router;
