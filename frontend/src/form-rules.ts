export const nameRules = [
  (v: string) => v.length > 0 || "Name cannot be empty",
  (v: string) => v.length <= 50 || "Name cannot exceed 50 characters",
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const emailRules = [
  (v: string) => v.length > 0 || "Email cannot be empty",
  (v: string) => emailRegex.test(v) || "Invalid email",
];

export const companyRules = [
  (v: string) => v.length <= 50 || "Company name cannot exceed 50 characters",
];

export const inquiryRules = [
  (v: string) => v.length > 0 || "Inquiry cannot be empty",
  (v: string) => v.length <= 300 || "Inquiry cannot exceed 300 characters",
];
