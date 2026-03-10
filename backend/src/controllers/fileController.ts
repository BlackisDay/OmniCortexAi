import { supabase } from "../supabaseClient";
import { Request, Response } from "express";
// Upload a file record
export const uploadFile = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  
  const role = req.user.role;
  if (!["CEO", "Manager", "HR"].includes(role))
    return res.status(403).json({ error: "Forbidden" });

  const { file_name, file_url, file_type } = req.body;

  try {
    const { data, error } = await supabase.from("file_records").insert([
      {
        company_id: req.user.company_id,
        uploaded_by: req.user.id,
        file_name,
        file_url,
        file_type,
      },
    ]);

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get all files for the company
export const getFiles = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  
  try {
    const { data, error } = await supabase
      .from("file_records")
      .select("*")
      .eq("company_id", req.user.company_id);

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};