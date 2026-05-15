import React, { useEffect, useState } from "react";
// import { getExpenses } from "../services/api";
import ExpenseForm from "../components/ExpensesForm";
import ExpenseList from "../components/ExpenseList";
import axios from "axios";
import { getExpense } from "../services/Api";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [update, setUpdate] = useState(false);

  const handleExpenseAdd = async (newExpense) => {
    const res = await fetch("http://localhost:5000/api/expenses", {
      method: "POST",
      body: JSON.stringify(newExpense),
      headers: {
        "Content-Type": "application/json",
      },
    }); 

    setExpenses((prev) => [...prev, data]);

    const data = await res.json();
    setExpenses([...expenses, data]);
  };

  const handleExpenseassign = (data) => {
    setUpdate(data);
  };

  useEffect(() => {
    const token = localStorage.getItem("token")
    console.log(token)
    axios
      .get("http://localhost:5000/api/expenses/get", {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then((response) => {
        setExpenses(response.data);
      });
  }, [update]);

  return (
    <div>
      <ExpenseForm onAdd={handleExpenseAdd} data={update} />
      <ExpenseList
        expenses={expenses}
        handleExpenseassign={handleExpenseassign}
      />
    </div>
  );
}

export default Expenses;
