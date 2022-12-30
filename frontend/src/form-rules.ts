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
  (v: string) => v.length >= 10 || "Inquiry must be at least 10 characters",
  (v: string) => v.length <= 300 || "Inquiry cannot exceed 300 characters",
];

export const usernameRules = [
  (v: string) => v.length > 0 || "Username cannot be empty",
  (v: string) => v.length <= 20 || "Username cannot exceed 20 characters",
];

export const passwordRules = [
  (v: string) => v.length > 0 || "Password cannot be empty",
  (v: string) => v.length <= 30 || "Password cannot exceed 30 characters",
];

export const newPasswordRules = [
  (v: string) => v.length >= 7 || "Password must be at least 7 characters",
  (v: string) => v.length <= 30 || "Password cannot exceed 30 characters",
];

const urlRegex =
  /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
export const urlRules = [
  (v: string) => v.length > 0 || "URL cannot be empty",
  (v: string) => v.length <= 2000 || "URL cannot exceed 2000 characters",
  (v: string) => urlRegex.test(v) || "Invalid URL",
];

export const hashRules = [
  (v: string) => v.length > 0 || "Hash cannot be empty",
  (v: string) => v.length <= 10 || "Hash cannot exceed 10 characters",
];

export const yearRules = [
  (v: number) => v > 2000 || "You weren't born yet, buckaroo",
  (v: number) => v <= new Date().getFullYear() + 1 || "Time traveling, are we?",
];
