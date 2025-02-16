import TransactionForm from "./components/TransactionForm";
import ExpenseChart from "./components/ExpenseChart";
import TransactionList from "./components/TransactionList";
import MonthlyBarChart from "./components/MonthlyBarChart";
import BalanceDisplay from "./components/BalanceDisplay";

function App() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Expense Tracker</h1>

      {/* Use a larger container with grid layout */}
      <div className="w-full max-w-6xl grid grid-cols-2 gap-8">
        {/* Left side: Transaction Form & List */}
        <div className="bg-white p-6 rounded-xl shadow-lg w-full">
          <BalanceDisplay />
          <TransactionForm />
          <TransactionList />
        </div>

        {/* Right side: Expense Chart */}
        <div>
          <div className="bg-white p-6 rounded-xl shadow-lg w-full flex justify-center">
            <ExpenseChart />
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg w-full flex justify-center">
            <MonthlyBarChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
