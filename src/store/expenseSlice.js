import { createSlice } from "@reduxjs/toolkit";

// Load transactions from localStorage
const loadTransactions = () => {
  const savedTransactions = localStorage.getItem("transactions");
  return savedTransactions ? JSON.parse(savedTransactions) : [];
};

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    transactions: loadTransactions(),
  },
  reducers: {
    addTransaction: (state, action) => {
      state.transactions.push(action.payload);
      localStorage.setItem("transactions", JSON.stringify(state.transactions)); // Save to localStorage
    },
    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter(
        (txn) => txn.id !== action.payload
      );
      localStorage.setItem("transactions", JSON.stringify(state.transactions)); // Update localStorage
    },
  },
});

export const { addTransaction, deleteTransaction } = expenseSlice.actions;
export default expenseSlice.reducer;
