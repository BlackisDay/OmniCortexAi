// src/components/ui/Loader.tsx
import React from "react";
import { useTheme } from "../../context/ThemeContext";

interface LoaderProps {
  size?: number;          // Diameter of spinner
  message?: string;       // Optional text below spinner
}

export const Loader: React.FC<LoaderProps> = ({ size = 24, message }) => {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <div
        className={`animate-spin rounded-full border-4 ${
          theme === "dark"
            ? "border-gray-700 border-t-blue-500"
            : "border-gray-300 border-t-blue-500"
        }`}
        style={{ width: size, height: size }}
      ></div>
      {message && (
        <span className="mt-2 text-sm text-gray-500 dark:text-gray-300">
          {message}
        </span>
      )}
    </div>
  );
};

export default Loader;