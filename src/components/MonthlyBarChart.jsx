import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Function to get month name from date
const getMonthName = (timestamp) => {
  return new Date(timestamp).toLocaleString("en-IN", { month: "short" });
};

const MonthlyBarChart = () => {
  const transactions = useSelector((state) => state.expense.transactions);

  // Group transactions by month
  const monthlyData = transactions.reduce((acc, txn) => {
    const month = getMonthName(txn.id);
    const existingMonth = acc.find((item) => item.month === month);

    if (existingMonth) {
      if (txn.amount > 0) existingMonth.income += txn.amount;
      else existingMonth.expense += Math.abs(txn.amount);
    } else {
      acc.push({
        month,
        income: txn.amount > 0 ? txn.amount : 0,
        expense: txn.amount < 0 ? Math.abs(txn.amount) : 0,
      });
    }
    return acc;
  }, []);

  return (
    <div className="p-4 bg-gray-100 rounded-lg mt-4">
      <h2 className="text-lg font-semibold text-center">Monthly Overview</h2>
      {monthlyData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#00C49F" name="Income" />
            <Bar dataKey="expense" fill="#E74C3C" name="Expense" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center text-gray-500 mt-3">No data available.</p>
      )}
    </div>
  );
};

export default MonthlyBarChart;
