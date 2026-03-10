import { Request } from "express";

// This will be used in all controllers to type req.user
export interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    company_id: string;
    role: "CEO" | "Manager" | "HR" | "Finance" | "Legal" | "Employee";
  };
}