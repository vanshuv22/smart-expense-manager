import React from "react";
// import { deleteExpense } from "../services/api";
import { useState } from "react";

function ExpenseList({
  expenses,
  setExpenses,
  handleExpenseUpdate,
  handleExpenseassign,
}) {
  const handleExpenseDelete = async (id) => {
    const res = await fetch(`http://localhost:5000/api/expenses/${id}`, {
      method: "DELETE",
    });
    setExpenses((prevExpenses) => prevExpenses.filter((exp) => exp._id !== id));
  };

  return (
    <>
      <div className="flex flex-wrap gap-4 ml-10">
        {expenses.map((exp) => (
          <div key={exp._id} className="border p-2 m-2 w-1/3 h-1/2 ml-10 mt-15">
            <h4>{exp.title}</h4>
            <p>
              {exp.amount} - {exp.category}
            </p>
            <div className="flex gap-4">
              <button
                className="h-10 w-60 bg-gray-200 text-black p-3 rounded-md ml-3 hover:bg-gray-400 transition "
                onClick={() => handleExpenseDelete(exp._id)}
              >
                Delete
              </button>{" "}
              <button
                className="h-10 w-60 bg-gray-200 text-black p-3 rounded-md hover:bg-gray-400 transition  "
                onClick={() => handleExpenseassign(exp)}
              >
                Update
              </button>{" "}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ExpenseList;
