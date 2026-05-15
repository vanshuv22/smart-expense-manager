import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ cart }) => {

 const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-white shadow-md p-5">
      <h1 className="h-full py-2 ml-120 text-7xl font-bold text-red-500">
        Expense Manager
      </h1>
      <div className="mt-[50px]">
        <Link
          to="/dashboard"
          className="h-full py-4 mt-15 ml-122 text-3xl font-bold text-black-400"
        >
          Dashboard
        </Link>
        <Link
          to="/expenses"
          className="h-full py-2 ml-1 text-3xl font-bold text-black-400"
        >
          Expenses
        </Link>
        <Link to="/product" className="h-full py-2 ml-1 text-3xl font-bold text-black-400" >
          Product
        </Link>

        <Link
          to="/cart"
          className="h-full py-2 ml-1 text-3xl font-bold text-black-400"
        >
          Cart ({totalItems})
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
