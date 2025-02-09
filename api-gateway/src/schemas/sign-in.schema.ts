import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("The email should be valid"),
  password: z.string(),
});
