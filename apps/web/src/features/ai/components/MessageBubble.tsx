// src/features/ai/components/MessageBubble.tsx
import React from "react";
// import { Card } from "components/ui";
import { Card } from "components/ui"; 

// If Card does not exist, you can define a simple Card component below:
//
// export const Card: React.FC<{ className?: string }> = ({ className, children }) => (
//   <div className={className}>{children}</div>
// );
import { useTheme } from "../../../context/ThemeContext";

interface MessageBubbleProps {
  message: string;
  sender: "user" | "ai";
  isLoading?: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, sender, isLoading }) => {
  const { theme } = useTheme();
  const isUser = sender === "user";

  return (
    <Card
      className={`
        max-w-[80%] ${isUser ? "ml-auto bg-blue-500 text-white" : "mr-auto bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"}
        ${isLoading ? "animate-pulse" : ""}
      `}
    >
      {message}
    </Card>
  );
};