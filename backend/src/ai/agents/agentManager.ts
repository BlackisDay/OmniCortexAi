export const AiAgent = {
  handleMessage: async (conversationId: string, message: string) => {
    console.log(`AI Agent processing message for conversation ${conversationId}: ${message}`);
    // Here you can call GPT/OpenAI API or other AI logic
    return "AI Response (stub)";
  }
};