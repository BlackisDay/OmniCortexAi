// src/features/ai/hooks/useAI.ts
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { processMessage, Conversation } from "../services/aiClient";

export const useAI = (userId: string, companyId: string) => {
  const [messages, setMessages] = useState<Conversation[]>([]);

  // sendMessage mutation
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (message: string) => {
      if (!userId || !companyId) throw new Error("Missing user or company ID");
      const conversation = await processMessage(userId, companyId, message);
      return conversation;
    },
    onSuccess: (conversation) => {
      setMessages((prev) => [...prev, conversation]);
    },
  });

  // Wrapper to expose sendMessage in friendly way
  const sendMessage = async (message: string) => {
    await mutateAsync(message);
  };

  return { messages, sendMessage, loading: isPending };
};