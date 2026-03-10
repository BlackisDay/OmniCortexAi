// src/features/transactions/components/TransactionTable.tsx
import React, { useState, useMemo } from "react";
import { Transaction } from "../hooks/useTransactions";

interface TransactionTableProps {
  data: Transaction[];
}

export const TransactionsTable: React.FC<TransactionTableProps> = ({ data }) => {
  const [sortKey, setSortKey] = useState<keyof Transaction>("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [search, setSearch] = useState<string>("");

  // Filtered data based on search input
  const filteredData = useMemo(() => {
    return data.filter(
      (tx) =>
        tx.user.toLowerCase().includes(search.toLowerCase()) ||
        tx.status.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  // Sorted data based on sortKey & sortOrder
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      if (sortKey === "amount") {
        return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
      } else if (sortKey === "date") {
        return sortOrder === "asc"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        const valA = (a[sortKey] as string).toLowerCase();
        const valB = (b[sortKey] as string).toLowerCase();
        return sortOrder === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
    });
  }, [filteredData, sortKey, sortOrder]);

  const toggleSort = (key: keyof Transaction) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <div className="w-full">
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by user or status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      {/* Transactions Table */}
      <table className="w-full border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="p-2 cursor-pointer" onClick={() => toggleSort("user")}>
              User
            </th>
            <th className="p-2 cursor-pointer" onClick={() => toggleSort("amount")}>
              Amount
            </th>
            <th className="p-2 cursor-pointer" onClick={() => toggleSort("status")}>
              Status
            </th>
            <th className="p-2 cursor-pointer" onClick={() => toggleSort("date")}>
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.length === 0 ? (
            <tr>
              <td colSpan={4} className="p-4 text-center text-gray-500 dark:text-gray-300">
                No transactions found
              </td>
            </tr>
          ) : (
            sortedData.map((tx) => (
              <tr key={tx.id} className="border-t border-gray-200 dark:border-gray-700">
                <td className="p-2">{tx.user}</td>
                <td className="p-2">${tx.amount.toFixed(2)}</td>
                <td
                  className={`p-2 font-semibold ${
                    tx.status === "completed"
                      ? "text-green-500"
                      : tx.status === "pending"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  {tx.status}
                </td>
                <td className="p-2">{new Date(tx.date).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};