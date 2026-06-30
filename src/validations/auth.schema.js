import z from "zod";
import { IdScm } from "./base.schema.js";

export const loginSchema = z.object({
  username: z.string("Not a string").min(3, "Minimum username is 3 letters"),
  password: z.string().min(6, "Password must be at least 6 letters"),
});

export const ChangePasswordSchema = z.object({
    oldPassword: z.string(),
    newPassword: z.string().min(6, "Password must be at least 6 letters"),
    // newPassword: PasswordScm,
    confirmPassword: z.string()
  }).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"], // This points the error to the confirmPassword field
});

export const EmailSchema = z.object({
    email: z.string().email("Invalid email address")
});