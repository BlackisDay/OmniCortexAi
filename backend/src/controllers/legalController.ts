import { supabase } from "../supabaseClient";
import { Request, Response } from "express";
export const getLegalDocs = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });

  const role = req.user.role;
  if (!["CEO", "Manager", "HR", "Legal"].includes(role))
    return res.status(403).json({ error: "Forbidden" });

  const { data, error } = await supabase
    .from("legal_documents")
    .select("*")
    .eq("company_id", req.user.company_id);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

export const uploadLegalDoc = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });

  const role = req.user.role;
  if (!["CEO", "Manager", "HR", "Legal"].includes(role))
    return res.status(403).json({ error: "Forbidden" });

  const { title, file_url } = req.body;
  const { data, error } = await supabase.from("legal_documents").insert([
    { title, file_url, company_id: req.user.company_id },
  ]);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};