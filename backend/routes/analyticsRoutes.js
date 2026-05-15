const express = require("express");
const router = express.Router();
const { getanalytics, getMonthlySummary, getCategorySummary } = require("../controllers/analyticsControllers");

router.get("/", getanalytics);

router.get("/category-summary", getCategorySummary);

router.get("/monthly-summary", getMonthlySummary);

module.exports = router;