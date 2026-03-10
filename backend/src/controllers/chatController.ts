import { supabase } from "../supabaseClient";
// Update the import path to match the actual location and filename of aiService.ts
import { processMessage } from "../ai/aiService";
import { Request, Response } from "express";

declare global {
  namespace Express {
    interface User {
      id: string;
      company_id: string;
    }
  }
}

export const getChats = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    const { data, error } = await supabase
      .from("conversations")
      .select("*")
      .eq("company_id", req.user.company_id);

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const sendChat = async (req: Request, res: Response) => {
  const { message } = req.body;
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    await processMessage(req.user.id, req.user.company_id, message);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};