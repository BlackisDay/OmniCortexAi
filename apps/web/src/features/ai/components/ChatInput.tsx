// src/features/ai/components/ChatInput.tsx
import React, { useState, KeyboardEvent } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, placeholder = "Type a message..." }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex gap-2 p-2">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder={placeholder}
        className="flex-1 resize-none rounded-md border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={2}
      />
      <button
        onClick={handleSend}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Send
      </button>
    </div>
  );
};