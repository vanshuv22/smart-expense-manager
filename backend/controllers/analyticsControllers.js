const Expense = require("../models/Expense");

exports.getanalytics = async (req, res) => {
  try {
    const data = await Expense.aggregate([
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
    ]);

    const formatted = data.map((exp) => ({
      category: exp._id,
      total: exp.total,
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCategorySummary = (req, res) => {
  res.json([
    { category: "Food", amount: 1000 },
    { category: "drinks", amount: 6000 },
    { category: "fruits", amount: 3000 },
    { category: "furniture", amount: 10000}
  ]);
};

exports.getMonthlySummary = async (req, res) => {
  try {
    const data = await Expense.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
          },
          total: { $sum: "$amount" },
        },
      },
      {
        $project: {
          _id: 0,
          month: {
            $concat: [
              { $toString: "$_id.year" },
              "-",
              { $toString: "$_id.month" },
            ],
          },
          total: 1,
        },
      },
    ]);

    console.log(data)

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};