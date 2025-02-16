import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTransaction } from "../store/expenseSlice";
import { Trash2, X, ChevronDown } from "lucide-react";
import moment from "moment";
import { motion, AnimatePresence } from "framer-motion";

const categoryIcons = {
  Salary: "💰",
  Freelance: "🛠️",
  Food: "🍔",
  Transport: "🚖",
  Rent: "🏠",
  Others: "🔹",
};

const categories = [
  "All",
  "Salary",
  "Freelance",
  "Food",
  "Transport",
  "Rent",
  "Others",
];

const TransactionList = () => {
  const transactions = useSelector((state) => state.expense.transactions);
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Filter Transactions Based on Search & Category
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.text
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || transaction.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="mt-6 bg-white shadow-lg rounded-xl p-6 w-full">
      <h2 className="text-lg font-semibold mb-4">Transaction History</h2>

      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        {/* Search Input */}
        <div className="relative w-full md:w-2/3">
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-3 border rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-500"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Animated Category Dropdown */}
        <div className="relative w-full md:w-1/3">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="p-3 border rounded-lg w-full shadow-sm flex justify-between items-center bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            {selectedCategory} <ChevronDown size={18} />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-10 w-full bg-white shadow-lg rounded-lg mt-1 border"
              >
                {categories.map((category) => (
                  <li
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setDropdownOpen(false);
                    }}
                    className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                  >
                    {categoryIcons[category] || "🔹"} {category}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {/* Clear Filters Button */}
        {(searchQuery || selectedCategory !== "All") && (
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Transaction List */}
      <ul className="space-y-4">
        {filteredTransactions.length === 0 ? (
          <p className="text-center text-gray-500">No matching transactions.</p>
        ) : (
          filteredTransactions.map((transaction) => (
            <li
              key={transaction.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border-l-4 shadow-sm"
              style={{
                borderColor: transaction.amount < 0 ? "#EF4444" : "#22C55E",
              }}
            >
              {/* Left: Icon + Name + Date */}
              <div className="flex items-center gap-3">
                <span className="text-xl">
                  {categoryIcons[transaction.category] || "🔹"}
                </span>
                <div>
                  <p className="font-semibold">{transaction.text}</p>
                  <p className="text-xs text-gray-500">
                    {moment(transaction.date).format("DD MMM, YYYY")}
                  </p>
                </div>
              </div>

              {/* Right: Amount + Delete Button */}
              <div className="flex items-center gap-4">
                <span
                  className={`font-semibold text-lg ${
                    transaction.amount < 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  ₹{Math.abs(transaction.amount).toLocaleString("en-IN")}
                </span>
                <button
                  onClick={() => dispatch(deleteTransaction(transaction.id))}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TransactionList;
