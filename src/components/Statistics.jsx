import { Users, Send, Gift, DollarSign } from "react-feather"

const Statistics = () => {
  const stats = [
    {
      label: "Customers",
      value: "220k",
      icon: Users,
      color: "bg-purple-100",
      iconColor: "text-purple-500",
    },
    {
      label: "Remittance",
      value: "230k",
      icon: Send,
      color: "bg-blue-100",
      iconColor: "text-blue-500",
    },
    {
      label: "Donation",
      value: "270k",
      icon: Gift,
      color: "bg-green-100",
      iconColor: "text-green-500",
    },
    {
      label: "Webincome",
      value: "130k",
      icon: DollarSign,
      color: "bg-yellow-100",
      iconColor: "text-yellow-500",
    },
  ]

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-medium text-gray-700 mb-4">Statistics</h3>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full ${stat.color} flex items-center justify-center ${stat.iconColor} mr-3`}
            >
              <stat.icon size={16} />
            </div>
            <div>
              <div className="text-sm font-medium">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Statistics
