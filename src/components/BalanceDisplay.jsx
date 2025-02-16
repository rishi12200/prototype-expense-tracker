import { useSelector } from "react-redux";

const BalanceDisplay = () => {
  const transactions = useSelector((state) => state.expense.transactions);
  const balance = transactions.reduce((acc, txn) => acc + txn.amount, 0);

  return (
    <div className="text-center my-4">
      <h2 className="text-xl font-semibold">Current Balance</h2>
      <p className="text-3xl font-bold">₹{balance}</p>
    </div>
  );
};

export default BalanceDisplay;
