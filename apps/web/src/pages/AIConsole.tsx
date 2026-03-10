// src/pages/AIConsole.tsx
import React from "react";
import { ChatWindow } from "../features/ai/components/ChatWindow";
import { useAI } from "../features/ai/hooks/useAI";

interface AIConsoleProps {
  userId: string;
  companyId: string;
}

const AIConsole: React.FC<AIConsoleProps> = ({ userId, companyId }) => {
  // Use your custom AI hook
  const { messages, sendMessage, loading } = useAI(userId, companyId);

  return (
    <div className="flex flex-col h-full w-full bg-gray-100 dark:bg-gray-900 p-4">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        AI Console
      </h1>

      {/* ChatWindow displays messages and input */}
      <ChatWindow
        messages={messages}
        loading={loading}
        onSendMessage={sendMessage}
      />
    </div>
  );
};

export default AIConsole;