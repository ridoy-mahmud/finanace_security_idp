import AccountBalance from "../components/AccountBalance"
import Statistics from "../components/Statistics"
import TransactionsTable from "../components/TransactionsTable"
import QuickTransfer from "../components/QuickTransfer"

const Overview = ({ accounts, transactions, user }) => {
  return (
    <>
      <h1 className="text-3xl font-semibold mb-8">Welcome, {user ? user.firstName : "Guest"}!</h1>

      <h2 className="text-2xl font-medium mb-6">Account Balance</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <AccountBalance title="Current Account" amount={accounts.current} currency="GHC" />
        <AccountBalance title="Saving Account" amount={accounts.savings} currency="GHC" />
        <Statistics />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TransactionsTable transactions={transactions} />
        </div>
        <div>
          <QuickTransfer />
        </div>
      </div>
    </>
  )
}

export default Overview
