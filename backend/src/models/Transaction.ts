export interface Transaction {
  id: string;
  company_id: string;
  amount: number;
  description: string;
  created_at?: string;
}