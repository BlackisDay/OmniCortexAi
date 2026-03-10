import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Example utility to fetch a table by company_id
export const fetchTableByCompany = async (table: string, companyId: string) => {
  const { data, error } = await supabase.from(table).select("*").eq("company_id", companyId);
  if (error) throw error;
  return data;
};