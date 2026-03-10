import { supabase } from "../supabaseClient";
import { Request, Response } from "express";
export const getTransactions = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });

  const role = req.user.role;
  const companyId = req.user.company_id;

  if (!["CEO", "Manager", "Finance"].includes(role))
    return res.status(403).json({ error: "Forbidden" });

  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("company_id", companyId);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

export const addTransaction = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });

  const role = req.user.role;
  if (!["CEO", "Manager", "Finance"].includes(role))
    return res.status(403).json({ error: "Forbidden" });

  const { amount, description } = req.body;
  const { data, error } = await supabase.from("transactions").insert([
    { amount, description, company_id: req.user.company_id },
  ]);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};