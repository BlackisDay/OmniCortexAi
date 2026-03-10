// src/pages/Transactions.tsx
import React from "react";
import { TransactionsTable } from "../features/transactions/components/TransactionTable";
import { useTransactions } from "../features/transactions/hooks/useTransactions";
import { Loader } from "../components/ui/Loader";

const Transactions: React.FC = () => {
  const { transactions, isLoading, error, refetch } = useTransactions();

  if (isLoading) return <Loader message="Loading transactions..." />;

  if (error)
    return (
      <div className="p-4 text-red-600">
        Error loading transactions: {error.message}
        <button
          className="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
          onClick={() => refetch()}
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>
      <TransactionsTable data={transactions} />
    </div>
  );
};

export default Transactions;