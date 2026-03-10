import { supabase } from "../supabaseClient";
import { Request, Response } from "express";
export const getSubscription = async (req: Request, res: Response) => {
    
     if(!req.user){
        return res.status(401).json({error: "Unauthorized"})
    }
    const companyId = req.user.company_id;

  if (req.user.role !== "CEO") return res.status(403).json({ error: "Forbidden" });

  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("company_id", req.user.company_id);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

export const updateSubscription = async (req:Request, res: Response) => {
    if(!req.user){
        return res.status(401).json({error: "Unauthorized"})
    }
    const companyId = req.user.company_id;
  if (req.user.role !== "CEO") return res.status(403).json({ error: "Forbidden" });

  const { plan, active } = req.body;
  const { data, error } = await supabase
    .from("subscriptions")
    .update({ plan, active })
    .eq("company_id", companyId);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};