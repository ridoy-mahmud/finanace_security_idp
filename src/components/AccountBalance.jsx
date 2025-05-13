const AccountBalance = ({ title, amount, currency }) => {
  // Format number with commas
  const formattedAmount = amount.toLocaleString()

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-medium text-gray-700 mb-4">{title}</h3>
      <div className="flex items-baseline">
        <span className="text-3xl font-bold text-blue-600">{formattedAmount}</span>
        <span className="ml-2 text-lg text-blue-600">{currency}</span>
      </div>
    </div>
  )
}

export default AccountBalance
