import z from "zod";

export const userEditSchema = z.object({
  username: z.string("Not a string").min(3, "Minimum username is 3 letters").optional(),
  firstname: z.string().min(1, "Firstname must have atleast 1 letter").optional(),
  lastname: z.string().min(1, "Lastname must have atleast 1 letter").optional(),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format").optional(),
  email: z.string().email("Invalid email address").optional(),
});