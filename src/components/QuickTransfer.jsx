"use client"

import { useState } from "react"
import { CreditCard, Send, Download, FileText, Grid } from "react-feather"

const QuickTransfer = () => {
  const [amount, setAmount] = useState("1.24")

  const contacts = [
    { id: 1, initial: "JD", color: "bg-red-400" },
    { id: 2, initial: "AB", color: "bg-blue-400" },
    { id: 3, initial: "CD", color: "bg-green-400" },
    { id: 4, initial: "EF", color: "bg-yellow-400" },
  ]

  const transferOptions = [
    { id: "send", icon: Send, label: "Send" },
    { id: "receive", icon: Download, label: "Receive" },
    { id: "invoicing", icon: FileText, label: "Invoicing" },
    { id: "more", icon: Grid, label: "More" },
  ]

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-medium text-gray-700 mb-6">Quick Transfer</h3>

      <div className="flex items-center mb-6">
        <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white">
          <CreditCard size={16} />
        </div>
        <div className="ml-3 flex-1">
          <div className="text-sm font-medium">Debit</div>
        </div>
        <div className="text-sm font-medium text-gray-700">$10,432</div>
        <div className="ml-2">
          <ChevronDown />
        </div>
      </div>

      <div className="mb-6">
        <div className="border border-gray-300 rounded-lg p-3 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
          <div className="text-xs text-gray-500 mb-1">Enter amount</div>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full text-lg font-medium focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-6">
        {transferOptions.map((option) => (
          <button key={option.id} className="flex flex-col items-center justify-center p-3 rounded-md hover:bg-gray-50">
            <div
              className={`w-8 h-8 rounded-full ${option.id === "send" ? "bg-purple-100 text-purple-500" : option.id === "receive" ? "bg-blue-100 text-blue-500" : option.id === "invoicing" ? "bg-yellow-100 text-yellow-500" : "bg-gray-100 text-gray-500"} flex items-center justify-center mb-1`}
            >
              <option.icon size={16} />
            </div>
            <span className="text-xs text-gray-600">{option.label}</span>
          </button>
        ))}
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Recent Contacts</h4>
        <div className="flex space-x-3">
          {contacts.map((contact) => (
            <button
              key={contact.id}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium"
              style={{ backgroundColor: contact.color }}
            >
              {contact.initial}
            </button>
          ))}
          <button className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
            +
          </button>
        </div>
      </div>
    </div>
  )
}

// Add missing ChevronDown component
const ChevronDown = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-gray-400"
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
)

export default QuickTransfer
