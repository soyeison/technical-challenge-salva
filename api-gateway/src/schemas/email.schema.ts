import { z } from "zod";

export const emailQuerySchema = z.object({
  email: z.string().email("The email should be valid"),
});
