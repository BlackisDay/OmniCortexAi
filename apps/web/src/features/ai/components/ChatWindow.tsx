import React from "react";
import { Conversation } from "../services/aiClient";
import { MessageBubble } from "./MessageBubble";
import { ChatInput } from "./ChatInput";
import { Loader } from "components/ui";

export interface ChatWindowProps {
  userId: string;
  companyId: string;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ userId, companyId }) => {
  // Replace with your actual hook/useSendMessage logic
  const { messages, sendMessage, loading } = {
    messages: [] as Conversation[],
    sendMessage: async (msg: string) => {},
    loading: false,
  };

  return (
    <div className="flex flex-col h-full w-full bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md p-4">
      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {loading && <Loader message="Loading messages..." />}
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            sender={message.user_id === userId ? "user" : "ai"}
          />
        ))}
      </div>

      <ChatInput
        value=""
        onChange={() => {}}
        onSend={sendMessage}
        placeholder="Type a message..."
      />
    </div>
  );
};