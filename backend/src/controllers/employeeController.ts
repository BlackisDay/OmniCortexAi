import { supabase } from "../supabaseClient";
import { Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; company_id: string; role: string };
    }
  }
}

export const getEmployees = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  
  const role = req.user.role;
  const companyId = req.user.company_id;
  const userId = req.user.id;

  try {
    let query = supabase.from("employees").select("*").eq("company_id", companyId);

    // Employees can only see themselves
    if (role === "Employee") query = query.eq("id", userId);

    const { data, error } = await query;
    if (error) return res.status(400).json({ error: error.message });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const addEmployee = async (req: Request, res: Response) => {
  const { name, email, role } = req.body;
  if (!req.user || !["Employee", "Manager", "HR", "Finance", "Legal"].includes(req.user.role))
    return res.status(403).json({ error: "Forbidden" });

  const { data, error } = await supabase.from("employees").insert([
    { name, email, role, company_id: req.user.company_id },
  ]);
  if (error) return res.status(400).json({ error: error.message });

  res.json(data);
};