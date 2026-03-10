// src/features/ai/types.ts
export interface Conversation {
  id: string;
  user_id: string;
  company_id: string;
  message: string;
  created_at?: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: string;
}