import { z } from "zod";

export const createUserSchema = z.object({
  fullName: z.string().min(5, "The full name should have at lest 5 characters"),
  userServiceId: z.coerce.number().int().positive(),
});
