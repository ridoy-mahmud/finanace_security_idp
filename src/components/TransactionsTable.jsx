"use client";

import { useState } from "react";
import { MoreVertical, ChevronDown } from "react-feather";

const TransactionsTable = ({ transactions }) => {
  const [filterType, setFilterType] = useState("All");

  const filteredTransactions =
    filterType === "All"
      ? transactions
      : transactions.filter((t) => t.type === filterType);

  const getTypeStyle = (type) => {
    switch (type) {
      case "Debit":
        return "bg-red-100 text-red-600";
      case "Credit":
        return "bg-green-100 text-green-600";
      case "Transfer":
        return "bg-blue-100 text-blue-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const handleFilterChange = (type) => {
    setFilterType(type);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-medium">Transactions</h2>
        <div className="flex items-center">
          <span className="mr-2 text-sm text-gray-600">Filter By</span>
          <div className="relative">
            <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md">
              <span>{filterType}</span>
              <ChevronDown size={16} className="ml-2" />
            </button>
            <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-10 hidden group-focus-within:block hover:block">
              <ul className="py-1">
                <li>
                  <button
                    onClick={() => handleFilterChange("All")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    All
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleFilterChange("Credit")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Credit
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleFilterChange("Debit")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Debit
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleFilterChange("Transfer")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Transfer
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-600">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Type
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Details
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Amount
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Balance
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${getTypeStyle(
                      transaction.type
                    )}`}
                  >
                    {transaction.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.details}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.amount} BDT
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.balance} BDT
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsTable;
