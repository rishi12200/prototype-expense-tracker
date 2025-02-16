import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useSelector } from "react-redux";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A569BD",
  "#EC7063",
];

const CategoryChart = () => {
  const transactions = useSelector((state) => state.expense.transactions);

  // Group transactions by category
  const categoryData = transactions
    .filter((txn) => txn.amount < 0) // Only expenses
    .reduce((acc, txn) => {
      const category = txn.category;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += Math.abs(txn.amount);
      return acc;
    }, {});

  const data = Object.entries(categoryData).map(
    ([category, amount], index) => ({
      name: category,
      value: amount,
      color: COLORS[index % COLORS.length],
    })
  );

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-center mb-2">
        Expenses by Category
      </h2>
      {data.length > 0 ? (
        <PieChart width={300} height={300}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `₹${value.toLocaleString("en-IN")}`} />
          <Legend />
        </PieChart>
      ) : (
        <p className="text-center text-gray-500">No expense data available</p>
      )}
    </div>
  );
};

export default CategoryChart;
