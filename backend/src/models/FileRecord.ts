export interface FileRecord {
  id: string;
  company_id: string;
  uploaded_by: string;
  file_name: string;
  file_url: string;
  file_type: string;
  created_at?: string;
  updated_at?: string;
}