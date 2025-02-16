import { useSelector } from "react-redux";

const IncomeExpense = () => {
  const transactions = useSelector((state) => state.expense.transactions);

  // Calculate income (sum of positive amounts)
  const income = transactions
    .filter((txn) => txn.amount > 0)
    .reduce((acc, txn) => acc + txn.amount, 0);

  // Calculate expenses (sum of negative amounts)
  const expenses = transactions
    .filter((txn) => txn.amount < 0)
    .reduce((acc, txn) => acc + Math.abs(txn.amount), 0);

  return (
    <div className="flex justify-between p-4 bg-white shadow-md rounded-lg my-4">
      <div className="text-center">
        <h4 className="text-gray-600">Income</h4>
        <p className="text-green-500 text-lg font-bold">
          ₹{income.toLocaleString("en-IN")}
        </p>
      </div>
      <div className="text-center">
        <h4 className="text-gray-600">Expense</h4>
        <p className="text-red-500 text-lg font-bold">
          ₹{expenses.toLocaleString("en-IN")}
        </p>
      </div>
    </div>
  );
};

export default IncomeExpense;
