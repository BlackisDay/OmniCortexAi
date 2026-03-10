// src/components/ui/Input.tsx
import React from "react";
import { useTheme } from "../../context/ThemeContext";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className, ...props }) => {
  const { theme } = useTheme();

  const baseClasses = `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200
    ${theme === "dark" ? "bg-gray-800 text-white border-gray-600 placeholder-gray-400" : "bg-white text-gray-900 border-gray-300 placeholder-gray-500"}
    ${error ? "border-red-500 focus:ring-red-500" : ""}`;

  return (
    <div className="flex flex-col w-full mb-3">
      {label && <label className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-300">{label}</label>}
      <input className={`${baseClasses} ${className || ""}`} {...props} />
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
};