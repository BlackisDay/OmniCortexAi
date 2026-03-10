import { supabase } from "../supabaseClient";
import { Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; company_id: string; role:string;};
    }
  }
}

// Simple analytics example: total employees, total transactions
export const getAnalytics = async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const companyId = req.user.company_id;

  try {
    const [{ data: employees }, { data: transactions }] = await Promise.all([
      supabase.from("employees").select("*").eq("company_id", companyId),
      supabase.from("transactions").select("*").eq("company_id", companyId),
    ]);

    res.json({
      totalEmployees: employees?.length || 0,
      totalTransactions: transactions?.reduce((sum, t) => sum + t.amount, 0) || 0,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};