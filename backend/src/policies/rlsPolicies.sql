-- Example for employees table
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;

CREATE POLICY "CEO access all" ON employees
  FOR SELECT, UPDATE, DELETE
  USING (auth.role() = 'CEO' AND company_id = auth.company_id());

CREATE POLICY "Manager access limited" ON employees
  FOR SELECT, UPDATE
  USING (auth.role() = 'Manager' AND company_id = auth.company_id());

CREATE POLICY "Employee own record" ON employees
  FOR SELECT, UPDATE
  USING (id = auth.uid());