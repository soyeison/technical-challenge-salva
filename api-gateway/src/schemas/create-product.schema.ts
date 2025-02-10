import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(2, "Name should have at least 2 characters"),
  description: z
    .string()
    .min(10, "Description should have at least 10 characters"),
  price: z.coerce.number().positive("Price should be positive"),
  stock: z.coerce.number().int().positive("Price should be positive"),
});
