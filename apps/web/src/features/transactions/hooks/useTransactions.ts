// src/pages/Transactions.tsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader } from "../components/ui/Loader";
import { TransactionTable } from "../features/transactions/components/TransactionTable";
import { data } from "react-router-dom";

export interface Transaction {
  id: string;
  user: string;
  amount: number;
  status: "completed" | "pending" | "failed";
  date: string;
}

const fetchTransactions = async (): Promise<Transaction[]> => {
  const res = await axios.get("http://localhost:4000/transactions"); // replace with your API
  return res.data;
};

const Transactions: React.FC = () => {
  const { data: transactions, isLoading, isError, error } = useQuery<Transaction[], Error>({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
    staleTime: 60_000, // 1 min caching
  });

  if (isLoading) return <Loader message="Loading transactions..." />;

  if (isError) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Transactions</h1>
      <TransactionTable data={transactions || []} />
    </div>
  );
};

export default Transactions;