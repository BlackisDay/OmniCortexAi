// Simple date formatting
export const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleString();
};

// Simple role check helper
export const hasRole = (userRole: string, allowedRoles: string[]) => {
  return allowedRoles.includes(userRole);
};