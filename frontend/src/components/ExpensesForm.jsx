import React, { useEffect, useState } from "react";
import { addExpense } from "../services/api";
import axios from "axios";

function ExpenseForm({ data }) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    dates: "",
    notes: "",
  });
  const handleExpenseUpdate = async (id) => {
    console.log("Update expense:", id);
    const res = await fetch(`http://localhost:5000/api/expenses/${id._id}`, {
      method: "PUT",
      body: JSON.stringify(id),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  useEffect(() => {
    if (data) {
      setForm(data);
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.amount > 5000) {
      alert("High expense alert!");
    }

    await axios.post("http://localhost:5000/api/expenses", {
      title: form.title,
      amount: form.amount,
      category: form.category,
      dates: form.dates,
      notes: form.notes,
    });
    setForm({ title: "", amount: "", category: "", dates: "", notes: "" });
    // refresh();

    const Submithandler = (e) => {
      e.preventDefault();

      const newExpense = {
        title: "Food",
        amount: 50,
        category: "burger",
        dates: "20-01-26",
        notes: "sdcfvg",
      };
      onAddExpenses(newExpense);
    };

    return <button onClick={Submithandler}>Add</button>;
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-gray-100 shadow-lg rounded-xl p-6">
      <h2 className="h-full py-2 ml-35 text-2xl font-bold text-black-400">Expenses</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />
        <input
          className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <input
          className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Dates"
          value={form.dates}
          onChange={(e) => setForm({ ...form, dates: e.target.value })}
        />

        <input
          className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Notes"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />
        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-blue-500 text-black py-2 rounded-md hover:bg-blue-600 transition"
          >
            Add
          </button>
          <button
            onClick={() => handleExpenseUpdate(data)}
            className="flex-1 bg-green-500 text-black py-2 rounded-md hover:bg-green-600 transition"
          >
            update
          </button>
        </div>
      </form>
    </div>
  );
}

export default ExpenseForm;
