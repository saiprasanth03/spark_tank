export const ALLOWED_ADMIN_EMAILS = [
  '24pa1a05k6@vishnu.edu.in',
  '24pa1a05k3@vishnu.edu.in',
  '24pa1a05k7@vishnu.edu.in',
  '24pa1a05m4@vishnu.edu.in',
  '24pa1a05j2@vishnu.edu.in'
];

export const isAdminEmail = (email) => {
  if (!email) return false;
  return ALLOWED_ADMIN_EMAILS.some(adminEmail => adminEmail.toLowerCase() === email.toLowerCase());
};
