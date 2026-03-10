// memoryManager.ts
interface MemoryItem {
  id: string;
  conversationId: string;
  content: string;
}

const memoryDB: MemoryItem[] = [];

export const MemoryManager = {
  storeMemory: (conversationId: string, content: string) => {
    const id = `${memoryDB.length + 1}`;
    memoryDB.push({ id, conversationId, content });
  },
  retrieveMemory: (conversationId: string) => {
    return memoryDB.filter(m => m.conversationId === conversationId);
  }
};