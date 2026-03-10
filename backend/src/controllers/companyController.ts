import { supabase } from "../supabaseClient";
import { Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; company_id: string; role: string };
    }
  }
}

// Get company info
export const getCompany = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });

  try {
    const { data, error } = await supabase
      .from("companies")
      .select("*")
      .eq("id", req.user.company_id)
      .single();

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update company info (only CEO)
export const updateCompany = async (req: Request, res: Response) => {
  if (!req.user || req.user.role !== "CEO") return res.status(403).json({ error: "Forbidden" });

  const { name, infrastructure, estimated_employees } = req.body;

  try {
    const { data, error } = await supabase
      .from("companies")
      .update({ name, infrastructure, estimated_employees })
      .eq("id", req.user.company_id);

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};