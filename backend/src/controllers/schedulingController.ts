import { supabase } from "../supabaseClient";
import { json, Request, Response } from "express";
export const getSchedules = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });

  const { data, error } = await supabase
    .from("schedules")
    .select("*")
    .eq("company_id", req.user.company_id);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

export const addSchedule = async (req: Request, res: Response) => {
    if(!req.user){
        return res.status(401).json({ error: "Unauthorized" })
    }
  const role = req.user.role;
  if (!["CEO", "Manager", "HR"].includes(role))
    return res.status(403).json({ error: "Forbidden" });

  const { employee_id, shift_start, shift_end } = req.body;
  const { data, error } = await supabase.from("schedules").insert([
    { employee_id, shift_start, shift_end, company_id: req.user.company_id },
  ]);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};