const express = require("express");
const router = express.Router();
const {
    setBudget,
    getBudget
} = require("../controllers/budgetControllers")

router.post("/", setBudget)
router.get("/", getBudget)

module.exports = router;