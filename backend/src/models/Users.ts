export interface User {
  id: string;               // Supabase Auth User ID
  company_id: string;       // The company the user belongs to
  name: string;             // Full name
  email: string;            // Email address
  role: "CEO" | "Manager" | "HR" | "Finance" | "Legal" | "Employee"; // Role
  created_at?: string;      // Optional timestamp
  updated_at?: string;      // Optional timestamp
}