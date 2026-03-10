export interface Team {
  id: string;
  company_id: string;
  name: string;
  members: string[]; // array of employee IDs
}