import React, { useEffect, useState } from "react";
import ChartComponent from "../components/ChartComponent";

// import { getExpenses } from "../services/api";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const data = [
      { id: 1, amount: 1000, category: "food", date: "2026-01-12" },
      { id: 2, amount: 3000, category: "fruits", date: "2026-02-20" },
      { id: 3, amount: 6000, category: "drinks", date: "2026-03-02" },
      { id: 4, amount: 4000, category: "travel", date: "2026-04-10" },
      { id: 5, amount: 10000, category: "furniture", date: "2026-05-10" },
     
    ];
    setExpenses(data);
  }, []);

  useEffect(() => {
    const fetchCategoryData = async () => {
      const token = localStorage.getItem("token")
     const res = await fetch(
       "http://localhost:5000/api/analytics/category-summary",
       {
         headers: {
          'Authorization': `Bearer ${token}`,
         },
       },
     );
      const data = await res.json();
      setCategory(data);
    };

    fetchCategoryData();
  }, []);

  useEffect(() => {
    const fetchMonthlyData = async () => {
      const token = localStorage.getItem("token")
      console.log(token)
      const res = await fetch(
        "http://localhost:5000/api/analytics/monthly-summary",
        {
          headers: {
           'Authorization': `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();
      setMonthlyData(data);
    };

    fetchMonthlyData();
  }, []);

  // const currentMonth = new Date().getMonth();
  // const currentYear = new Date().getYear();
  const now = new Date();

  const previousMonth = now.getMonth() - 1;
  const currentYear = now.getYear();

  const previousMonthlyExpenses = expenses.filter((exp) => {
    const expenseDate = new Date(exp.date);

    return (
      expenseDate.getMonth() === previousMonth &&
      expenseDate.getYear() === currentYear
    );
  });

  const totalPreviousMonthlyExpenses = previousMonthlyExpenses.reduce(
    (sum, exp) => sum + exp.amount,
    0,
  );

  const handleExpenseDelete = (id) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  const handleExpenseassign = (exp) => {
    alert(`Update ${exp.category}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Dashboard
        </h2>

        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-2">Monthly Summary</h3>

          <p className="text-gray-600 text-lg">
            Total Expenses:
            <span className="font-bold text-red-500 ml-2">
              ₹ {totalPreviousMonthlyExpenses}
            </span>
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Category Chart</h3>
          <ChartComponent expenses={expenses} />
        </div>

        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
          <h3 className="font-semibold mb-1">Alert</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {expenses.map((exp) => (
              <div
                key={exp.id}
                className="bg-white text-black rounded-lg p-4 shadow"
              >
                <h4 className="font-bold text-lg">{exp.amount}</h4>
                <p className="text-gray-600 mb-3">{exp.category}</p>

                <div className="flex gap-2">
                  <button
                    className="h-10 w-60 bg-gray-200 text-black p-3 rounded-md ml-3 hover:bg-gray-400 transition "
                    onClick={() => handleExpenseDelete(exp.id)}
                  >
                    Delete
                  </button>

                  <button
                    className="h-10 w-60 bg-gray-200 text-black p-3 rounded-md hover:bg-gray-400 transition  "
                    onClick={() => handleExpenseassign(exp)}
                  >
                    Update
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
