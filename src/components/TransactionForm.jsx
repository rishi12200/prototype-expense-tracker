import { addTransaction } from "../store/expenseSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

const TransactionForm = () => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("expense"); // Default to "expense"
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text || !amount || !category) return;

    const transactionAmount =
      type === "expense" ? -Math.abs(amount) : Math.abs(amount);

    dispatch(
      addTransaction({
        id: Date.now(),
        text,
        amount: transactionAmount,
        category,
      })
    );
    setText("");
    setAmount("");
    setCategory("");
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl mt-6 flex flex-col items-center">
      <h2 className="text-lg font-semibold text-center">Add Transaction</h2>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 mt-4">
        <div className="flex justify-center gap-4">
          <button
            type="button"
            className={`px-4 py-2 rounded-lg font-semibold ${
              type === "income"
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setType("income")}
          >
            Income
          </button>

          <button
            type="button"
            className={`px-4 py-2 rounded-lg font-semibold ${
              type === "expense"
                ? "bg-red-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setType("expense")}
          >
            Expense
          </button>
        </div>

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter transaction name"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-center"
        />

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-center"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-center"
        >
          <option value="">Select Category</option>
          <option value="Salary">Salary</option>
          <option value="Freelance">Freelance</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Rent">Rent</option>
          <option value="Others">Others</option> {/* Added "Others" category */}
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
