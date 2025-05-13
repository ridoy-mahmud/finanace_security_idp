"use client"

import { useState } from "react"
import { Target, Plus, Edit2, Trash2 } from "react-feather"

const GoalsPage = () => {
  const [goals, setGoals] = useState([
    {
      id: 1,
      name: "Emergency Fund",
      targetAmount: 10000,
      currentAmount: 6500,
      deadline: "2023-12-31",
      color: "bg-blue-500",
    },
    {
      id: 2,
      name: "New Car",
      targetAmount: 25000,
      currentAmount: 8750,
      deadline: "2024-06-30",
      color: "bg-green-500",
    },
    {
      id: 3,
      name: "Vacation",
      targetAmount: 5000,
      currentAmount: 3200,
      deadline: "2023-08-15",
      color: "bg-purple-500",
    },
  ])

  const [showGoalForm, setShowGoalForm] = useState(false)
  const [editingGoal, setEditingGoal] = useState(null)
  const [newGoal, setNewGoal] = useState({
    name: "",
    targetAmount: "",
    currentAmount: "",
    deadline: "",
  })

  const handleAddGoal = (e) => {
    e.preventDefault()

    // Simple validation
    if (!newGoal.name || !newGoal.targetAmount || !newGoal.deadline) {
      return
    }

    const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-yellow-500", "bg-red-500", "bg-indigo-500"]

    if (editingGoal) {
      // Update existing goal
      setGoals(
        goals.map((goal) =>
          goal.id === editingGoal.id
            ? {
                ...goal,
                name: newGoal.name,
                targetAmount: Number.parseFloat(newGoal.targetAmount),
                currentAmount: Number.parseFloat(newGoal.currentAmount) || 0,
                deadline: newGoal.deadline,
              }
            : goal,
        ),
      )
    } else {
      // Add new goal
      const randomColor = colors[Math.floor(Math.random() * colors.length)]

      const newGoalObj = {
        id: goals.length + 1,
        name: newGoal.name,
        targetAmount: Number.parseFloat(newGoal.targetAmount),
        currentAmount: Number.parseFloat(newGoal.currentAmount) || 0,
        deadline: newGoal.deadline,
        color: randomColor,
      }

      setGoals([...goals, newGoalObj])
    }

    // Reset form
    setNewGoal({
      name: "",
      targetAmount: "",
      currentAmount: "",
      deadline: "",
    })
    setShowGoalForm(false)
    setEditingGoal(null)
  }

  const handleEditGoal = (goal) => {
    setEditingGoal(goal)
    setNewGoal({
      name: goal.name,
      targetAmount: goal.targetAmount.toString(),
      currentAmount: goal.currentAmount.toString(),
      deadline: goal.deadline,
    })
    setShowGoalForm(true)
  }

  const handleDeleteGoal = (id) => {
    setGoals(goals.filter((goal) => goal.id !== id))
  }

  const calculateProgress = (current, target) => {
    return Math.min(Math.round((current / target) * 100), 100)
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const getRemainingDays = (deadline) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">Financial Goals</h1>
        <button
          onClick={() => {
            setEditingGoal(null)
            setNewGoal({
              name: "",
              targetAmount: "",
              currentAmount: "",
              deadline: "",
            })
            setShowGoalForm(!showGoalForm)
          }}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <Plus size={18} className="mr-2" />
          Add New Goal
        </button>
      </div>

      {showGoalForm && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-8">
          <h2 className="text-xl font-medium mb-4">{editingGoal ? "Edit Goal" : "Add New Goal"}</h2>
          <form onSubmit={handleAddGoal}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Goal Name</label>
                <input
                  type="text"
                  value={newGoal.name}
                  onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Emergency Fund"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Amount</label>
                <input
                  type="number"
                  value={newGoal.targetAmount}
                  onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="10000"
                  min="1"
                  step="0.01"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Amount (Optional)</label>
                <input
                  type="number"
                  value={newGoal.currentAmount}
                  onChange={(e) => setNewGoal({ ...newGoal, currentAmount: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Date</label>
                <input
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={() => {
                  setShowGoalForm(false)
                  setEditingGoal(null)
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md mr-2 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                {editingGoal ? "Update Goal" : "Add Goal"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => {
          const progress = calculateProgress(goal.currentAmount, goal.targetAmount)
          const remainingDays = getRemainingDays(goal.deadline)

          return (
            <div key={goal.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full ${goal.color} flex items-center justify-center text-white mr-3`}
                    >
                      <Target size={20} />
                    </div>
                    <h3 className="text-lg font-medium">{goal.name}</h3>
                  </div>
                  <div className="flex space-x-1">
                    <button onClick={() => handleEditGoal(goal)} className="p-1 text-gray-400 hover:text-gray-600">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDeleteGoal(goal.id)} className="p-1 text-gray-400 hover:text-gray-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Progress</span>
                    <span className="font-medium">{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className={`h-2.5 rounded-full ${goal.color}`} style={{ width: `${progress}%` }}></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Current</div>
                    <div className="font-medium">${goal.currentAmount.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Target</div>
                    <div className="font-medium">${goal.targetAmount.toLocaleString()}</div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Deadline</div>
                    <div className="font-medium">{formatDate(goal.deadline)}</div>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      remainingDays < 0
                        ? "bg-red-100 text-red-600"
                        : remainingDays < 30
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-green-100 text-green-600"
                    }`}
                  >
                    {remainingDays < 0 ? "Overdue" : remainingDays === 0 ? "Today" : `${remainingDays} days left`}
                  </div>
                </div>
              </div>

              <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                <button className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  Add Funds
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default GoalsPage
