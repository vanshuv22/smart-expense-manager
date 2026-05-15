import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { id: 1, amount: 1000, category: "food" },
  { id: 2, amount: 3000, category: "fruits" },
  { id: 3, amount: 6000, category: "drinks" },
  { id: 4, amount: 10000, category: "furniture" },
];

export default function IndexLineChart({ expenses }) {
  console.log(expenses)
  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <LineChart data={expenses}>
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />

          <XAxis dataKey="category" />
          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="amount"
            stroke="#8884d8"
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
