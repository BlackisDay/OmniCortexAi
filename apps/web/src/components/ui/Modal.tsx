// src/components/ui/Modal.tsx
import React from "react";
import { createPortal } from "react-dom";
import { useTheme } from "../../context/ThemeContext";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const { theme } = useTheme();

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className={`w-full max-w-lg mx-4 rounded-lg shadow-lg overflow-hidden ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        {title && (
          <div className="px-4 py-3 border-b dark:border-gray-700">
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
        )}
        <div className="p-4">{children}</div>
        <div className="px-4 py-3 border-t flex justify-end space-x-2 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};