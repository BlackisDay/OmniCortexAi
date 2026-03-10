import { supabase } from "../services/supabaseService";
import { Request, Response, NextFunction } from "express";

export const authMiddleware = async (req: any, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data.user) return res.status(401).json({ error: "Invalid token" });

    req.user = {
      id: data.user.id,
      email: data.user.email,
      role: data.user.user_metadata.role || "Employee",
      company_id: data.user.user_metadata.company_id || "",
    };
    next();
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};