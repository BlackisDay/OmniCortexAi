// aiService.ts
import { supabase } from "../../../backend/src/supabaseClient";
import { generateEmbeddings } from "./embeddings/embeddingsManager";
import { AiAgent } from "./agents/agentManager";
import { MemoryManager } from "./memory/memoryManager";
import { spawn } from "child_process";
import path from "path";

//Engine for handling AI interactions, including fetching data, processing messages, and managing conversations with the AI agent.
const runMathEngine = (task: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    
    const scriptPath = path.join(__dirname, "../math/engineRunner.py");

    const python = spawn("python", [scriptPath]);

    let result = "";
    let errorOutput = "";

    python.stdout.on("data", (data) => {
      result += data.toString();
    });

    python.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    python.on("close", () => {
      if (errorOutput) {
        reject(errorOutput);
      } else {
        try {
          resolve(JSON.parse(result));
        } catch {
          resolve(result);
        }
      }
    });

    python.stdin.write(JSON.stringify(task));
    python.stdin.end();
  });
};

//Detect what engine to use based on the message content
const detectMathTask = (message: string) => {

  const msg = message.toLowerCase();

  if (msg.includes("solve")) {
    return {
      engine: "algebra",
      action: "solve",
      params: { equation: message, variable: "x" }
    };
  }

  if (msg.includes("derivative")) {
    return {
      engine: "calculus",
      action: "derivative",
      params: { expression: message.replace("derivative", ""), var: "x" }
    };
  }

  if (msg.includes("integral")) {
    return {
      engine: "calculus",
      action: "integral",
      params: { expression: message.replace("integral", ""), var: "x" }
    };
  }

  if (msg.includes("sin") || msg.includes("cos") || msg.includes("tan")) {
    return {
      engine: "trig",
      action: "solve",
      params: { equation: message, var: "x" }
    };
  }

  if (msg.includes("mean") || msg.includes("average")) {
    const numbers = message.match(/\d+/g)?.map(Number) || [];
    return {
      engine: "statistics",
      action: "mean",
      params: { data: numbers }
    };
  }

  if (msg.includes("forecast") || msg.includes("predict")) {
    return {
      engine: "forecast",
      action: "predict",
      params: {
        x: [1,2,3,4],
        y: [2,4,6,8],
        steps: 2
      }
    };
  }

  return null;
};

// ----------------------
// Types
// ----------------------
export interface AiData {
  id: string;
  prompt: string;
  response: string;
  created_at?: string;
}

export interface Conversation {
  id: string;
  user_id: string;
  company_id: string;
  message: string;
  created_at?: string;
}

// ----------------------
// Fetch all AI data
// ----------------------
export const getAllAiData = async (): Promise<AiData[] | null> => {
  const { data, error } = await supabase.from("ai_table").select("*");

  if (error) {
    console.error("Supabase fetch error:", error);
    return null;
  }

  if (!data || data.length === 0) return null;

  return data as AiData[];
};

// ----------------------
// Process a user message
// ----------------------
export const processMessage = async (
  userId: string,
  companyId: string,
  message: string
): Promise<Conversation> => {

  const { data, error } = await supabase
    .from("conversations")
    .insert([{ user_id: userId, company_id: companyId, message }])
    .select("*");

  if (error) {
    console.error("Supabase insert error:", error);
    throw error;
  }

  if (!data || data.length === 0)
    throw new Error("Failed to insert conversation");

  const conversation: Conversation = data[0];

  // --------------------
  // Detect Math Task
  // --------------------

  const mathTask = detectMathTask(message);

  if (mathTask) {

    try {

      const result = await runMathEngine(mathTask);

      await supabase.from("ai_table").insert({
        id: conversation.id,
        prompt: message,
        response: JSON.stringify(result)
      });

      return conversation;

    } catch (err) {
      console.error("Math engine error:", err);
    }

  }

  // --------------------
  // Normal AI pipeline
  // --------------------

  await generateEmbeddings(conversation.id, message);

  await MemoryManager.storeMemory(conversation.id, message);

  await AiAgent.handleMessage(conversation.id, message);

  return conversation;
};