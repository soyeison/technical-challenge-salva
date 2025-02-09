import { z } from "zod";

export const createUserSchema = z.object({
  firstName: z
    .string()
    .min(2, "The first name should have at least 2 characters"),
  lastName: z
    .string()
    .min(2, "The last name should have at least 2 characters"),
  email: z.string().email("The email should be valid"),
  password: z
    .string()
    .min(6, "The password shoueld have at least 6 characters"),
});
