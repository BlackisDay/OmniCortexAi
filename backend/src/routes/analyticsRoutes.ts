import { Response } from "express";
import { AuthenticatedRequest } from "../utils/types"; // your global type for req.user
import { supabase } from "../supabaseClient";

export const getAnalytics = async (req: AuthenticatedRequest, res: Response) => {
  // Ensure req.user exists
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const companyId = req.user.company_id;

  try {
    // Fetch employees and transactions
    const [employeesResult, transactionsResult] = await Promise.all([
      supabase.from("employees").select("*").eq("company_id", companyId),
      supabase.from("transactions").select("*").eq("company_id", companyId),
    ]);

    const employees = employeesResult.data ?? []; // handle null
    const transactions = transactionsResult.data ?? []; // handle null

    // Calculate total transactions safely
    const totalTransactions = transactions.reduce((sum: number, t: any) => {
      return sum + (t.amount ?? 0);
    }, 0);

    res.json({
      totalEmployees: employees.length,
      totalTransactions,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};