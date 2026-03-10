import { supabase } from "../supabaseClient";
import { Request, Response } from "express";

// Sign up employee or CEO
export const signup = async (req: Request, res: Response) => {
  const { email, password, role, company_id } = req.body;
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) return res.status(400).json({ error: error.message });

    // Insert into employees table
    await supabase.from("employees").insert([
      { id: data.user?.id, email, role, company_id },
    ]);

    res.json({ message: "Signup successful", user: data.user });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return res.status(400).json({ error: error.message });

    res.json({ message: "Login successful", user: data.user });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};