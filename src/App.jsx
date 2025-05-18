"use client";

import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Overview from "./pages/Overview";
import TransactionsPage from "./pages/TransactionsPage";
import CardsPage from "./pages/CardsPage";
import InvoicesPage from "./pages/InvoicesPage";
import GoalsPage from "./pages/GoalsPage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import VerifyOTP from "./pages/VerifyOTP";
import "./index.css";

function App() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState({
    current: 5400,
    savings: 10200,
  });
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: "Debit",
      date: "11/20/20",
      details: "Sub Box Restaurant",
      amount: 70,
      balance: 5400,
    },
    {
      id: 2,
      type: "Credit",
      date: "10/15/20",
      details: "Salary",
      amount: 4500,
      balance: 5330,
    },
    {
      id: 3,
      type: "Transfer",
      date: "10/10/20",
      details: "Transfer from Savings",
      amount: 1000,
      balance: 6300,
    },
    {
      id: 4,
      type: "Debit",
      date: "9/27/20",
      details: "Palace Supermarket",
      amount: 250,
      balance: 6050,
    },
    {
      id: 5,
      type: "Debit",
      date: "9/25/20",
      details: "Amazon Purchase",
      amount: 120,
      balance: 5930,
    },
  ]);

  // Check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // If user has accounts data, use it
      if (parsedUser.accounts) {
        setAccounts(parsedUser.accounts);
      }
    }
    setLoading(false);
  }, []);

  // Function to add a new transaction
  const addTransaction = (type, details, amount, accountType = "current") => {
    const date = new Date();
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${String(
      date.getFullYear()
    ).slice(2)}`;

    // Update account balance
    const newAccounts = { ...accounts };

    if (type === "Deposit" || type === "Credit") {
      newAccounts[accountType] += amount;
    } else if (type === "Withdrawal" || type === "Debit") {
      newAccounts[accountType] -= amount;
    }

    // Create new transaction
    const newTransaction = {
      id: transactions.length + 1,
      type:
        type === "Deposit" ? "Credit" : type === "Withdrawal" ? "Debit" : type,
      date: formattedDate,
      details,
      amount,
      balance: newAccounts[accountType],
    };

    // Update state
    setAccounts(newAccounts);
    setTransactions([newTransaction, ...transactions]);

    return newTransaction;
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return (
        <div className="flex h-screen items-center justify-center">
          Loading...
        </div>
      );
    }

    if (!user) {
      return <Navigate to="/login" />;
    }

    // If user is not verified (no OTP verification), redirect to OTP page
    if (!user.verified && window.location.pathname !== "/verify-otp") {
      return <Navigate to="/verify-otp" />;
    }

    return children;
  };

  // Dashboard layout component
  const DashboardLayout = ({ children }) => {
    return (
      <div className="flex h-screen bg-white">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onLogout={handleLogout}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header user={user} onLogout={handleLogout} />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    );
  };

  // Render the active tab content
  const renderContent = () => {
    switch (activeTab) {
      case "Overview":
        return (
          <Overview
            accounts={accounts}
            transactions={transactions}
            user={user}
          />
        );
      case "Transactions":
        return (
          <TransactionsPage
            accounts={accounts}
            transactions={transactions}
            addTransaction={addTransaction}
          />
        );
      case "Cards":
        return <CardsPage />;
      case "Invoices":
        return <InvoicesPage />;
      case "Goals":
        return <GoalsPage />;
      case "Settings":
        return <SettingsPage user={user} />;
      default:
        return (
          <Overview
            accounts={accounts}
            transactions={transactions}
            user={user}
          />
        );
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <LoginPage setUser={setUser} />}
        />
        <Route
          path="/register"
          element={
            user ? <Navigate to="/" /> : <RegisterPage setUser={setUser} />
          }
        />
        <Route
          path="/verify-otp"
          element={
            <ProtectedRoute>
              <VerifyOTP setUser={setUser} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <DashboardLayout>{renderContent()}</DashboardLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
