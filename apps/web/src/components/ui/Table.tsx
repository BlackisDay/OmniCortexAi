// src/components/ui/Table.tsx
import React from "react";
import { useTheme } from "../../context/ThemeContext";

interface TableProps<T> {
  data: T[];
  columns: { key: keyof T; label: string }[];
  striped?: boolean;
  className?: string;
}

export const Table = <T extends object>({ data, columns, striped = true, className }: TableProps<T>) => {
  const { theme } = useTheme();

  return (
    <div className="overflow-x-auto w-full">
      <table
        className={`min-w-full border rounded-lg overflow-hidden ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"} ${className || ""}`}
      >
        <thead>
          <tr className={`${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
            {columns.map((col) => (
              <th key={String(col.key)} className="px-4 py-2 text-left text-sm font-medium">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`${striped && rowIndex % 2 === 0 ? (theme === "dark" ? "bg-gray-700" : "bg-gray-50") : ""}`}
            >
              {columns.map((col) => (
                <td key={String(col.key)} className="px-4 py-2 text-sm">
                  {String(row[col.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};