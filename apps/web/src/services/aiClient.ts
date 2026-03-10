// src/features/ai/services/aiClient.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

declare global {
  interface ImportMeta {
    env: {
      VITE_API_URL?: string;
      [key: string]: any;
    };
  }
}

// ----------------------
// Types
// ----------------------
export interface Conversation {
  id: string;
  user_id: string;
  company_id: string;
  message: string;
  created_at?: string;
}

export interface AiData {
  id: string;
  prompt: string;
  response: string;
  created_at?: string;
}
export interface Conversation {
  id: string;
  user_id: string;
  content: string;
  timestamp?: string;
}
// ----------------------
// Backend API base URL
// ----------------------
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

// ----------------------
// API calls
// ----------------------
export const fetchAllAiData = async (): Promise<AiData[]> => {
  const res = await axios.get(`${API_BASE_URL}/ai/data`);
  return res.data;
};

export const postMessage = async (
  userId: string,
  companyId: string,
  message: string
): Promise<Conversation> => {
  const res = await axios.post(`${API_BASE_URL}/ai/message`, {
    userId,
    companyId,
    message,
  });
  return res.data;
};

// ----------------------
// React Query Hooks
// ----------------------
export const useAiData = () => {
  return useQuery<AiData[], Error>({
    queryKey: ["aiData"],
    queryFn: fetchAllAiData,
    staleTime: 60_000, // 1 minute
  });
};

export const useSendMessage = (userId: string, companyId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (message: string) => postMessage(userId, companyId, message),
    onSuccess: (newConversation) => {
      // Refresh queries if needed
      queryClient.invalidateQueries({ queryKey: ["aiData"] });
      queryClient.invalidateQueries({ queryKey: ["conversations", userId, companyId] });
    },
  });
};

// ----------------------
// Export API object for direct calls
// ----------------------
export const api = {
  fetchAllAiData,
  postMessage,
};