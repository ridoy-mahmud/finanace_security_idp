"use client";

import { useState } from "react";
import TransactionsTable from "../components/TransactionsTable";
import { DollarSign, ArrowDown, ArrowUp } from "react-feather";

const TransactionsPage = ({ accounts, transactions, addTransaction }) => {
  const [transactionType, setTransactionType] = useState("deposit");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [accountType, setAccountType] = useState("current");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate amount
    const numAmount = Number.parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    // Validate withdrawal amount
    if (transactionType === "withdrawal" && numAmount > accounts[accountType]) {
      setError(`Insufficient funds in your ${accountType} account`);
      return;
    }

    // Clear previous messages
    setError("");

    // Process transaction
    const details =
      description || (transactionType === "deposit" ? "Deposit" : "Withdrawal");
    const type = transactionType === "deposit" ? "Deposit" : "Withdrawal";

    addTransaction(type, details, numAmount, accountType);

    // Show success message and reset form
    setSuccess(`${type} of ${numAmount} GHC was successful!`);
    setAmount("");
    setDescription("");

    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccess("");
    }, 3000);
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-8">Transactions</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-1 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-medium mb-4">Make a Transaction</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
              {success}
            </div>
          )}

          <div className="flex mb-4">
            <button
              type="button"
              className={`flex-1 py-2 px-4 rounded-l-md flex items-center justify-center ${
                transactionType === "deposit"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setTransactionType("deposit")}
            >
              <ArrowDown size={16} className="mr-2" />
              Deposit
            </button>
            <button
              type="button"
              className={`flex-1 py-2 px-4 rounded-r-md flex items-center justify-center ${
                transactionType === "withdrawal"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setTransactionType("withdrawal")}
            >
              <ArrowUp size={16} className="mr-2" />
              Withdraw
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Account
              </label>
              <select
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="current">
                  Current Account ({accounts.current} BDT)
                </option>
                <option value="savings">
                  Savings Account ({accounts.savings} BDT)
                </option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount (BDT)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign size={16} className="text-gray-400" />
                </div>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description (Optional)
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter description"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {transactionType === "deposit"
                ? "Deposit Funds"
                : "Withdraw Funds"}
            </button>
          </form>
        </div>

        <div className="lg:col-span-2">
          <TransactionsTable transactions={transactions} />
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
