import z from "zod";

export const loginSchema = z.object({
  username: z.string("Not a string").min(3, "Minimum username is 3 letters"),
  password: z.string().min(6, "Password must be at least 6 letters"),
});