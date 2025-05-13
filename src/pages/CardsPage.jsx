"use client"

import { useState } from "react"
import { CreditCard, Plus, Eye, EyeOff, Edit2, Trash2 } from "react-feather"

const CardsPage = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      type: "Visa",
      number: "4532 **** **** 7685",
      expiry: "05/25",
      name: "Ridoy Ahmed",
      color: "bg-gradient-to-r from-blue-500 to-purple-500",
    },
    {
      id: 2,
      type: "Mastercard",
      number: "5236 **** **** 1298",
      expiry: "11/24",
      name: "Ridoy Ahmed",
      color: "bg-gradient-to-r from-red-500 to-yellow-500",
    },
  ])

  const [showCardForm, setShowCardForm] = useState(false)
  const [showCardNumber, setShowCardNumber] = useState(false)
  const [newCard, setNewCard] = useState({
    type: "Visa",
    number: "",
    expiry: "",
    name: "",
  })

  const handleAddCard = (e) => {
    e.preventDefault()

    // Simple validation
    if (!newCard.number || !newCard.expiry || !newCard.name) {
      return
    }

    // Format card number
    const formattedNumber = `${newCard.number.substring(0, 4)} **** **** ${newCard.number.substring(newCard.number.length - 4)}`

    // Determine card color
    const colors = [
      "bg-gradient-to-r from-blue-500 to-purple-500",
      "bg-gradient-to-r from-red-500 to-yellow-500",
      "bg-gradient-to-r from-green-500 to-teal-500",
      "bg-gradient-to-r from-indigo-500 to-blue-500",
    ]
    const randomColor = colors[Math.floor(Math.random() * colors.length)]

    // Add new card
    const newCardObj = {
      id: cards.length + 1,
      type: newCard.type,
      number: formattedNumber,
      expiry: newCard.expiry,
      name: newCard.name,
      color: randomColor,
    }

    setCards([...cards, newCardObj])

    // Reset form
    setNewCard({
      type: "Visa",
      number: "",
      expiry: "",
      name: "",
    })
    setShowCardForm(false)
  }

  const handleDeleteCard = (id) => {
    setCards(cards.filter((card) => card.id !== id))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">Your Cards</h1>
        <button
          onClick={() => setShowCardForm(!showCardForm)}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <Plus size={18} className="mr-2" />
          Add New Card
        </button>
      </div>

      {showCardForm && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-8">
          <h2 className="text-xl font-medium mb-4">Add New Card</h2>
          <form onSubmit={handleAddCard}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Type</label>
                <select
                  value={newCard.type}
                  onChange={(e) => setNewCard({ ...newCard, type: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Visa">Visa</option>
                  <option value="Mastercard">Mastercard</option>
                  <option value="American Express">American Express</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <input
                  type="text"
                  value={newCard.number}
                  onChange={(e) => setNewCard({ ...newCard, number: e.target.value.replace(/\D/g, "") })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="1234 5678 9012 3456"
                  maxLength="16"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                <input
                  type="text"
                  value={newCard.expiry}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "")
                    if (value.length <= 4) {
                      const month = value.substring(0, 2)
                      const year = value.substring(2, 4)
                      setNewCard({ ...newCard, expiry: value.length > 2 ? `${month}/${year}` : month })
                    }
                  }}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="MM/YY"
                  maxLength="5"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                <input
                  type="text"
                  value={newCard.name}
                  onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={() => setShowCardForm(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md mr-2 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Add Card
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card) => (
          <div key={card.id} className={`${card.color} text-white rounded-xl p-6 shadow-lg`}>
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center">
                <CreditCard size={24} className="mr-2" />
                <span className="text-lg font-medium">{card.type}</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowCardNumber(!showCardNumber)}
                  className="p-1 rounded-full hover:bg-white/20"
                >
                  {showCardNumber ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                <button className="p-1 rounded-full hover:bg-white/20">
                  <Edit2 size={18} />
                </button>
                <button onClick={() => handleDeleteCard(card.id)} className="p-1 rounded-full hover:bg-white/20">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-sm opacity-80 mb-1">Card Number</div>
              <div className="text-xl font-medium tracking-wider">
                {showCardNumber ? card.number.replace(/\*+/g, "5678") : card.number}
              </div>
            </div>

            <div className="flex justify-between">
              <div>
                <div className="text-sm opacity-80 mb-1">Card Holder</div>
                <div className="font-medium">{card.name}</div>
              </div>
              <div>
                <div className="text-sm opacity-80 mb-1">Expires</div>
                <div className="font-medium">{card.expiry}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-medium mb-4">Card Settings</h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
            <div>
              <h3 className="font-medium">Card Limits</h3>
              <p className="text-sm text-gray-500">Set spending limits for your cards</p>
            </div>
            <button className="px-4 py-2 text-blue-500 border border-blue-500 rounded-md hover:bg-blue-50">
              Configure
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
            <div>
              <h3 className="font-medium">Online Payments</h3>
              <p className="text-sm text-gray-500">Enable or disable online transactions</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
            <div>
              <h3 className="font-medium">ATM Withdrawals</h3>
              <p className="text-sm text-gray-500">Enable or disable ATM withdrawals</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardsPage
