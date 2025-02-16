import { useSelector } from "react-redux";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#FF5733",
  "#FF914D",
  "#FFC300",
  "#C70039",
  "#900C3F",
  "#581845",
];

const ExpenseChart = () => {
  const transactions = useSelector((state) => state.expense.transactions);

  // Filter only expense transactions (negative amounts)
  const expenseTransactions = transactions.filter((txn) => txn.amount < 0);

  // Group expenses by category
  const chartData = expenseTransactions.reduce((acc, txn) => {
    const existing = acc.find((item) => item.name === txn.category);
    if (existing) {
      existing.value += Math.abs(txn.amount);
    } else {
      acc.push({ name: txn.category, value: Math.abs(txn.amount) });
    }
    return acc;
  }, []);

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl mt-6 flex flex-col items-center">
      <h2 className="text-center font-semibold text-lg">Expense Breakdown</h2>

      {chartData.length > 0 ? (
        <div className="flex justify-center">
          <ResponsiveContainer width={300} height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-2">
          No expense data available.
        </p>
      )}
    </div>
  );
};

export default ExpenseChart;
